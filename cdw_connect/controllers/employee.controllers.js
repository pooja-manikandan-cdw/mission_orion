const { MESSAGES, STATUS_CODES } = require("../constants/response.constants");
const {
  getPendingUsers,
  signupEmployee,
  signinEmployee,
  updatePendingUser,
} = require("../services/employee.services");
const { setResponse } = require("../utils/response.utils");
const passport = require("../middleware/passport.mIddleware")

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
    if (result) {
      setResponse(res, CREATED, true, false, EMPLOYEE.SUCCESS_SIGNUP, result);
    } else {
      // rework
      setResponse(res, CREATED, true, false, EMPLOYEE.SUCCESS_SIGNUP, result);
    } 
  } catch (err) {
    next(err);
  }
};

const signinEmployeeController = async (req, res, next) => {
  try {
    passport.authenticate("local", async(err, user) => {
      if (err) {
        return next(err);
      }
      if (user) {
        const result = await signinEmployee(req.user);
        setResponse(res, 200, true, false, "logged in successfully", result);
      }
    })(req, res, next);
  } catch (err) {
    next(err);
  }
};

const updatePendingUserController = async (req, res, next) => {
  try {
    const result = await updatePendingUser(req.params.employeeId, req.query.approvalStatus);
    setResponse(res, 200, true, false, "status updated successfully", result);
  } catch (err) {
    next(err);
  }
};

const updateUserProfileController = async(req, res, next) => {
  try {
    const result = await updateUser(req.param.id, req.body);
    setResponse(res, 200, true, false, "status updated successfully", result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPendingUsersController,
  signupEmployeeController,
  signinEmployeeController,
  updatePendingUserController,
  updateUserProfileController
};
