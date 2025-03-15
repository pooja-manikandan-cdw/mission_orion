const AppError = require("../AppError");
const jwt = require("jsonwebtoken");
const { ROLE, AUTHORIZATION_CONSTANTS } = require("../constants");
const { STATUS_CODES } = require("../constants/response.constants");

const {
  AUTHORIZATION,
  UNAUTHORIZED_USER,
  SESSION_EXPIRED,
  COWORKER_UNAUTHORIZED,
} = AUTHORIZATION_CONSTANTS;

const { UNAUTHORIZED } = STATUS_CODES;

/**
 * @description middleware to authorize user using jwt token
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next callback function
 */
const authorizeUser = (req, res, next) => {
  const header = req.headers[AUTHORIZATION];
  const token = header && header.split(" ")[1];
  if (!token) throw new AppError(UNAUTHORIZED, UNAUTHORIZED_USER, "");
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      throw new AppError(UNAUTHORIZED, SESSION_EXPIRED, "");
    }
    req.employee = user;
    next();
  });
};

/**
 * @description middleware to authorize only admin user using jwt token
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Object} next callback function
 */
const authorizeAdmin = (req, res, next) => {
  if (req.employee.role === ROLE.ADMIN) {
    next();
  } else {
    throw new AppError(UNAUTHORIZED, COWORKER_UNAUTHORIZED, "");
  }
};

module.exports = { authorizeUser, authorizeAdmin };
