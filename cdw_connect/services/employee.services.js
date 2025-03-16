const passport = require("passport");
const AppError = require("../AppError");
const { CDW_EMPLOYEE_MOCK } = require("../constants/apiEndpoint.contants");
const { STATUS_CODES, MESSAGES } = require("../constants/response.constants");
const employees = require("../models/employee.model");
const { encryptPassword } = require("../utils/dataEncryption.utils");
const jwt = require("jsonwebtoken");
const { APPROVAL_STATUS, ROLE, EMAIL_DETAILS } = require("../constants");
const { sendMail } = require("../utils/mailer.utils");
const { hasTwoDaysPassed } = require("../utils/date.utils");

const { SUCCESS, NOT_FOUND, BAD_REQUEST } = STATUS_CODES;
const {
  PENDING_USERS_NOT_FOUND,
  USER_NOT_FOUND,
  EMPLOYEE,
  EMPLOYEE_STATUS_REJECT,
  UNABLE_UPDATE_ADMIN_STATUS,
  INVALID_STATUS_RECEIVED,
} = MESSAGES.FAILURE;
const { STATUS, REJECTED, PENDING } = APPROVAL_STATUS;
const { ADMIN, CO_WORKER } = ROLE;
const { TITLE, MAIL } = EMAIL_DETAILS;

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
  if (response?.status !== 200) return null;
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
  if (existingUser?.length && existingUser[0].approvalStatus === REJECTED) {
    if (!hasTwoDaysPassed(existingUser[0].timestamp)) {
      throw new AppError(BAD_REQUEST, EMPLOYEE_STATUS_REJECT, "");
    } else {
      const updatedResult = await employees.updateOne(
        { employeeId: employeeId },
        { approvalStatus: REJECTED }
      );
      if (updatedResult.modifiedCount) return true;
    }
    throw new AppError(BAD_REQUEST, EMPLOYEE_EXIST, "");
  }
  // encrypt password and update the same in db
  const hashedPassword = await encryptPassword(password);
  const newEmployee = {
    ...employeeDetails,
    password: hashedPassword,
  };
  if (role === CO_WORKER) {
    newEmployee["approvalStatus"] = PENDING;
  }
  const employee = await new employees(newEmployee).save();
  if (employee) {
    return employee;
  }
};

/**
 * sign in user and returns a jwt token
 * @param {Object} user details of the logged in user
 * @returns jwt token
 */
const signinEmployee = async (user) => {
  const { role, approvalStatus } = user;
  const { WAITING_FOR_APPROVAL, REJECTED_MESSAGE } = MESSAGES.SIGN_IN;
  let token = "";
  switch (role) {
    case ADMIN:
      token = jwt.sign(
        { employeeId: user.employeeId, role: user.role, email: user.email },
        process.env.SECRET_KEY,
        {
          expiresIn: "3000s",
        }
      );
      return {
        token,
        employeeId: user.employeeId,
        email: user.email,
        name: user.name,
        role: user.role,
        profilePicture: user.profilePicture,
        certifications: user.certifications,
        experience: user.experience,
        bu: user.bu,
        location: user.location,
      };
    case CO_WORKER:
      if (approvalStatus === PENDING) {
        throw new AppError(BAD_REQUEST, WAITING_FOR_APPROVAL, "");
      } else if (approvalStatus === REJECTED) {
        throw new AppError(BAD_REQUEST, REJECTED_MESSAGE, "");
      } else {
        token = jwt.sign(
          { employeeId: user.employeeId, email: user.email, role: user.role },
          process.env.SECRET_KEY,
          {
            expiresIn: "3000s",
          }
        );
        return {
          token,
          employeeId: user.employeeId,
          email: user.email,
          name: user.name,
          role: user.role,
          profilePicture: user.profilePicture,
          certifications: user.certifications,
          experience: user.experience,
          bu: user.bu,
          location: user.location,
        };
      }
    default:
      return "";
  }
};

/**
 * @description updates user profile for the employeeId received
 * @param {String} employeeId id to which user should be updated
 * @param {Object} user details to be updated
 * @returns boolean based the updated status
 */
const updateUser = async (employeeId, user) => {
  const updatedResult = await employees.updateOne(
    { employeeId: employeeId },
    { ...user }
  );
  if (updatedResult.modifiedCount) return true;
  throw new AppError(BAD_REQUEST, USER_NOT_FOUND, "");
};

/**
 * @description fetch all the pending users
 * @returns the pending users
 */
const getPendingUsers = async () => {
  const pendingUsers = await employees.find({
    approvalStatus: PENDING,
    role: CO_WORKER,
  });
  if (!pendingUsers || !pendingUsers.length)
    throw new AppError(SUCCESS, PENDING_USERS_NOT_FOUND, "");
  return pendingUsers;
};

/**
 * @description update the pending user status
 * @param {String} id update the status for the id
 * @param {String} approvalStatus status to be updated
 * @returns
 */
const updatePendingUser = async (id, approvalStatus) => {
  const response = await fetch(CDW_EMPLOYEE_MOCK);
  const data = await response.json();

  // check if employee is found in json
  const employeeFound = data?.employee?.find(
    (employee) => employee.employeeId === id
  );

  if (!employeeFound) throw new AppError(SUCCESS, PENDING_USERS_NOT_FOUND, "");
  if (employeeFound) {
    if (STATUS.includes(approvalStatus)) {
      const updatedResult = await employees.updateOne(
        { employeeId: id, role: CO_WORKER },
        { approvalStatus: approvalStatus, timestamp: new Date() }
      );
      if (updatedResult.modifiedCount) {
        sendMail(
          TITLE,
          MAIL,
          `<!doctype html>
            <html ⚡4email>
              <body>
              <h1>Hi</h1><br><br>
                <p style="font-size: 20px;">Your signin request have been ${approvalStatus}</p>
                ${
                  approvalStatus
                    ? '<p style="color: red;">please try again after 2 days</p>'
                    : "<p>click link to login to cdw connect</p>"
                }
              </body>
            </html>`
        );
        return approvalStatus;
      } else {
        throw new AppError(BAD_REQUEST, UNABLE_UPDATE_ADMIN_STATUS, "");
      }
    } else {
      throw new AppError(BAD_REQUEST, INVALID_STATUS_RECEIVED, "");
    }
  }
};

const getEmployeeDetails = async (employeeId) => {
  const user = await employees.findOne({ employeeId: employeeId });
  return {
    employeeId: user.employeeId,
    email: user.email,
    name: user.name,
    role: user.role,
    profilePicture: user.profilePicture,
    certifications: user.certifications,
    experience: user.experience,
    bu: user.bu,
    location: user.location,
  };
};

module.exports = {
  getPendingUsers,
  updatePendingUser,
  updateUser,
  signupEmployee,
  signinEmployee,
  getEmployeeDetails,
};
