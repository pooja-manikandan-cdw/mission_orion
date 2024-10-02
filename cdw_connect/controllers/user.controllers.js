const { MESSAGES, STATUS_CODES } = require("../constants/response.constants");
const { getPendingUsers } = require("../services/user.services");
const { setResponse } = require("../utils/response.utils");

const { SUCCESS } = STATUS_CODES;
const { PENDING_USERS_FETCH_SUCCESS } = MESSAGES.SUCCESS;
const getPendingUsersController = async (req, res) => {
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

module.exports = { getPendingUsersController };
