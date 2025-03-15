const AppError = require("../AppError");
const { setResponse } = require("../utils/response.utils");
const logger = require("../utils/logger.utils");
const { STATUS_CODES, MESSAGES } = require("../constants/response.constants");
const { validationResult } = require("express-validator");
const { VALIDATION_FAILED } = MESSAGES.FAILURE;

/**
 * @description returns the app error to res send
 * @param {object} err error object
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next callback function
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

/**
 * @description returns the app error based on incorrect validation
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next callback function
 */
const validateRequiredPayload = (req, res, next) => {
  const validation = validationResult(req);
  if (validation.errors.length) {
    const requiredFields = validation.errors.map((error) => error.msg);
    throw new AppError(
      STATUS_CODES.BAD_REQUEST,
      `${VALIDATION_FAILED} ${requiredFields}`,
      ""
    );
  }
  next();
};

module.exports = { errorHandler, validateRequiredPayload };
