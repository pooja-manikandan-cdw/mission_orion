const AppError = require("../AppError");
const { MESSAGES, STATUS_CODES } = require("../constants/response.constants");

const authorizeUser = (req, res, next) => {
  if (req.isAuthorized()) {
    next();
  } else {
    throw new AppError(
      STATUS_CODES.UNAUTHORIZED,
      MESSAGES.AUTHENTICATION.USER_NOT_AUTHORIZED,
      ""
    );
  }
};

module.exports = { authorizeUser };
