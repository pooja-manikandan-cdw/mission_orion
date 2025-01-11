const { MESSAGES, STATUS_CODES } = require("../constants/response.constants");
const {
  getPendingUsers,
  signupEmployee,
  signinEmployee,
  updatePendingUser,
} = require("../services/employee.services");
const { setResponse } = require("../utils/response.utils");

const { SUCCESS, CREATED } = STATUS_CODES;
const { PENDING_USERS_FETCH_SUCCESS, EMPLOYEE } = MESSAGES.SUCCESS;
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

const signupEmployeeController = async (req, res, next) => {
  try {
    const result = await signupEmployee(req.body);
    console.log("result", result);
    if (result) {
      setResponse(res, CREATED, true, false, EMPLOYEE.SUCCESS_SIGNUP, result);
    }
  } catch (err) {
    next(err);
  }
};

const signinEmployeeController = async (req, res, next) => {
  try {
    const result = await signinEmployee(req.body);
  } catch (err) {
    next(err);
  }
};

const updatePendingUserController = async (req, res, next) => {
  try {
    const result = await updatePendingUser(req.params.id);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPendingUsersController,
  signupEmployeeController,
  signinEmployeeController,
  updatePendingUserController,
};
