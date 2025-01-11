const passport = require("passport");
const AppError = require("../AppError");
const { CDW_EMPLOYEE_MOCK } = require("../constants/apiEndpoint.contants");
const { STATUS_CODES, MESSAGES } = require("../constants/response.constants");
const employees = require("../models/employee.model");
const { encryptPassword } = require("../utils/dataEncryption.utils");

const { SUCCESS, NOT_FOUND, BAD_REQUEST } = STATUS_CODES;
const { PENDING_USERS_NOT_FOUND, USER_NOT_FOUND, EMPLOYEE } = MESSAGES.FAILURE;

/**
 * @description function to signup employee based on the employee present in cdw mock json
 * @param {object} employeeDetails
 * @returns successful signed up employee
 */
const signupEmployee = async (employeeDetails) => {
  const { EMPLOYEE_EXIST, UNABLE_TO_FIND_EMPLOYEE } = EMPLOYEE;
  const { employeeId, name, email, password, role } = employeeDetails;

  // fetch cdw employee json
  const response = await fetch(CDW_EMPLOYEE_MOCK);
  const data = await response.json();

  // check if employee is found in json
  const employeeFound = data.employees.find(
    (employee) => employee.employeeId === employeeDetails.employeeId
  );
  console.log("data", data);
  // console.log('employeeFound', employeeFound);

  //  throw error when employee not fiund
  if (!employeeFound) {
    throw new AppError(NOT_FOUND, UNABLE_TO_FIND_EMPLOYEE, "");
  }
  // check if user already exist in DB and throw error if found
  const existingUser = await employees.find({ employeeId: employeeId });
  console.log("existingUser", existingUser);
  if (existingUser.length) {
    throw new AppError(BAD_REQUEST, EMPLOYEE_EXIST, "");
  }
  // encrypt password and update the same in db
  const hashedPassword = await encryptPassword(password);
  const newEmployee = {
    employeeId,
    name,
    email,
    password: hashedPassword,
  }
  if(role === 'co-worker') {
    newEmployee['approvalStatus'] = 'pending'
  }
  console.log('newEmployee', newEmployee);
  const employee = await new employees(newEmployee).save();
  if (employee) {
    return employee;
  }
};

const signinEmployee = async (employeeDetails) => {
  const { employeeId, password } = employeeDetails;
  console.log(employeeId, password);

  passport.authenticate("local", (err, user) => {
    console.log("came here");
    if (err) {
      console.log("err", err);
      throw err;
    }
    console.log("userrrr", user);
    // req.logIn(user, (err) => {
    //   if (err) next(err);
    //   res.status(200).send({ data: user });
    // });
  });
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
  const pendingUsers = await employees.find({ approvalStatus: "pending" });
  console.log("pendingUsers", pendingUsers);
  if (!pendingUsers || !pendingUsers.length)
    throw new AppError(SUCCESS, PENDING_USERS_NOT_FOUND, "");
  return pendingUsers;
};

const getPendingUserById = async (employeeId) => {
  const employee = await employees.findOne({ employeeId: employeeId });
  if (employee) return employee;

  throw new AppError(404, "Employee not found for id", "");
};

const updatePendingUser = async (id) => {

  const response = await fetch(CDW_EMPLOYEE_MOCK);
  const data = await response.json();

  // check if employee is found in json
  const employeeFound = data.employees.find(
    (employee) => employee.employeeId === employeeDetails.employeeId
  );

  if(employeeFound) {
    await employees.updateOne(
      { employeeId: id },
      { approvalStatus: "approved" }

    );
    return "approved";
  } else {
     await employees.updateOne(
      { employeeId: id },
      { approvalStatus: "rejected" }

    );
    return "rejected";
  }


  
  // if (updatedResult.modifiedCount) return true;
  // throw new AppError(NOT_FOUND, USER_NOT_FOUND, "");
};

module.exports = {
  getPendingUsers,
  updatePendingUser,
  updateUser,
  signupEmployee,
  signinEmployee,
  getPendingUserById,
};
