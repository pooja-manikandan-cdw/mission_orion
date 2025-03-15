const { MESSAGES, STATUS_CODES } = require("../constants/response.constants");
const {
  getPendingUsers,
  signupEmployee,
  signinEmployee,
  updatePendingUser,
  updateUser,
  getEmployeeDetails,
} = require("../services/employee.services");
const { setResponse } = require("../utils/response.utils");
const passport = require("../middleware/passport.mIddleware");

const { SUCCESS, CREATED } = STATUS_CODES;
const { PENDING_USERS_FETCH_SUCCESS, EMPLOYEE } = MESSAGES.SUCCESS;

/**
 * @description controller to initate pending users service call
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next callback function
 */
const getPendingUsersController = async (req, res, next) => {
  try {
    const result = await getPendingUsers();
    if (result)
      setResponse(
        res,
        SUCCESS,
        true,
        false,
        PENDING_USERS_FETCH_SUCCESS,
        result
      );
  } catch (err) {
    next(err);
  }
};

/**
 * @description controller to initate signup users service call
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next callback function
 */
const signupEmployeeController = async (req, res, next) => {
  try {
    const result = await signupEmployee(req.body);
    if (result) {
      setResponse(res, CREATED, true, false, EMPLOYEE.SUCCESS_SIGNUP, result);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @description controller to initate sign in users service call
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next callback function
 */
const signinEmployeeController = async (req, res, next) => {
  try {
    passport.authenticate("local", async (err, user) => {
      if (err) {
        return next(err);
      }
      if (user) {
        const result = await signinEmployee(req.employee);
        setResponse(res, SUCCESS, true, false, EMPLOYEE.SUCCESS_SIGNIN, result);
      }
    })(req, res, next);
  } catch (err) {
    next(err);
  }
};

/**
 * @description controller to update pending users service call
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next callback function
 */
const updatePendingUserController = async (req, res, next) => {
  try {
    const result = await updatePendingUser(
      req.params.employeeId,
      req.query.approvalStatus
    );
    if (result) {
      setResponse(
        res,
        SUCCESS,
        true,
        false,
        EMPLOYEE.SUCCESS_STATUS_UPDATE,
        result
      );
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @description controller to update users service call
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next callback function
 */
const updateUserProfileController = async (req, res, next) => {
  try {
    const result = await updateUser(req.params.employeeId, req.body);
    setResponse(
      res,
      SUCCESS,
      true,
      false,
      EMPLOYEE.SUCCESS_PROFILE_UPDATE,
      result
    );
  } catch (err) {
    next(err);
  }
};

/**
 * @description controller to initate fetch user details service call
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next callback function
 */
const getEmployeeDetailsController = async (req, res, next) => {
  try {
    const result = await getEmployeeDetails(req.params.employeeId);
    if (result) {
      setResponse(
        res,
        SUCCESS,
        true,
        false,
        EMPLOYEE.SUCCESS_EMPLOYEE_FETCH,
        result
      );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPendingUsersController,
  signupEmployeeController,
  signinEmployeeController,
  updatePendingUserController,
  updateUserProfileController,
  getEmployeeDetailsController,
};
