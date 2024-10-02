const AppError = require("../AppError");
const { setResponse } = require("../utils/response.utils");
const logger = require("../utils/logger.utils");
const { STATUS_CODES } = require("../constants/response.constants");

/**
 * @description returns the app error to res send
 * @param {object} err
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 */
const errorHandler = (err, req, res, next) => {
  logger.error(err);
  if (err instanceof AppError) {
    return setResponse(
      res,
      err.statusCode,
      false,
      true,
      err.message,
      err.errorCode
    );
  }
  return setResponse(
    res,
    STATUS_CODES.BAD_REQUEST,
    false,
    true,
    err.message,
    {}
  );
};

module.exports = errorHandler;
