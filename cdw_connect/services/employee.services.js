const passport = require("passport");
const AppError = require("../AppError");
const { CDW_EMPLOYEE_MOCK } = require("../constants/apiEndpoint.contants");
const { STATUS_CODES, MESSAGES } = require("../constants/response.constants");
const employees = require("../models/employee.model");
const { encryptPassword } = require("../utils/dataEncryption.utils");
const jwt = require("jsonwebtoken");
const { APPROVAL_STATUS } = require("../constants");

const { SUCCESS, NOT_FOUND, BAD_REQUEST } = STATUS_CODES;
const { PENDING_USERS_NOT_FOUND, USER_NOT_FOUND, EMPLOYEE } = MESSAGES.FAILURE;
const { STATUS } = APPROVAL_STATUS

/**
 * @description function to signup employee based on the employee present in cdw mock json
 * @param {object} employeeDetails
 * @returns successful signed up employee
 */
const signupEmployee = async (employeeDetails) => {
  const { EMPLOYEE_EXIST, UNABLE_TO_FIND_EMPLOYEE } = EMPLOYEE;
  const { employeeId, password, role } = employeeDetails;

  // fetch cdw employee json
  const response = await fetch(CDW_EMPLOYEE_MOCK);
  if(response?.status !== 200)
    return null;
  const data = await response.json();

  // check if employee is found in json
  const employeeFound = data?.employee?.find(
    (employee) => employee.employeeId === employeeDetails.employeeId
  );

  //  throw error when employee not fiund
  if (!employeeFound) {
    throw new AppError(NOT_FOUND, UNABLE_TO_FIND_EMPLOYEE, "");
  }
  // check if user already exist in DB and throw error if found
  const existingUser = await employees.find({ employeeId: employeeId });
  if (existingUser?.length) {
    throw new AppError(BAD_REQUEST, EMPLOYEE_EXIST, "");
  }
  // encrypt password and update the same in db
  const hashedPassword = await encryptPassword(password);
  const newEmployee = {
    ...employeeDetails,
    password: hashedPassword,
  }
  if(role === 'co-worker') {
    newEmployee['approvalStatus'] = 'pending'
  }
  const employee = await new employees(newEmployee).save();
  if (employee) {
    return employee;
  }
};

const signinEmployee = async (user) => {
  const { role, approvalStatus } = user;
  const {WAITING_FOR_APPROVAL, REJECTED} = MESSAGES.SIGN_IN;
  let token='';
  switch (role) {
    case 'admin':
      token = jwt.sign({employeeId: user.employeeId, role: user.role},  process.env.SECRET_KEY, {
        expiresIn: "3000s",
      });
      return token;
    case 'co-worker':
      if(approvalStatus === 'pending') {
        throw new AppError(BAD_REQUEST, WAITING_FOR_APPROVAL, "");
      } else if(approvalStatus === 'rejected') {
        throw new AppError(BAD_REQUEST, REJECTED, "");
      } else {
        token = jwt.sign({employeeId: user.employeeId, role: user.role},  process.env.SECRET_KEY, {
          expiresIn: "3000s",
        });
        return token;
      }
    default: 
      return '';
    }
};

const updateUser = async (employeeId, user) => {
  const updatedResult = await employees.updateOne(
    { employeeId: employeeId },
    ...user
  );
  if (updatedResult.modifiedCount) return true;
  throw new AppError(BAD_REQUEST, UNABLE_TO_FIND_USER, "");
};

const getPendingUsers = async () => {
  const pendingUsers = await employees.find({ approvalStatus: "pending", role: 'co-worker' });
  if (!pendingUsers || !pendingUsers.length)
    throw new AppError(SUCCESS, PENDING_USERS_NOT_FOUND, "");
  return pendingUsers;
};

const updatePendingUser = async (id, approvalStatus) => {

  const response = await fetch(CDW_EMPLOYEE_MOCK);
  const data = await response.json();

  // check if employee is found in json
  const employeeFound = data?.employee?.find(
    (employee) => employee.employeeId === id
  );

  if(!employeeFound)
    throw new AppError(SUCCESS, PENDING_USERS_NOT_FOUND, "");
  if(employeeFound) {
    if(STATUS.includes(approvalStatus)) {
      const updatedResult = await employees.updateOne(
       { employeeId: id },
       { approvalStatus: approvalStatus }
     );
     if (updatedResult.modifiedCount)
      return approvalStatus;
    } else {
      throw new AppError(BAD_REQUEST, "invalid status received for approval", "");
    }
  };
};

module.exports = {
  getPendingUsers,
  updatePendingUser,
  updateUser,
  signupEmployee,
  signinEmployee,
};
