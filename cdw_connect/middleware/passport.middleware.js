const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const employees = require("../models/employee.model"); // Adjust this to your actual model path
const AppError = require("../AppError"); // Assuming custom error handling function
const { decryptPassword } = require("../utils/dataEncryption.utils");
const { PASSPORT } = require("../constants");
const { STATUS_CODES } = require("../constants/response.constants");

const {
  EMPLOYEEID,
  PASSWORD,
  EMPLOYEE_NOT_FOUND,
  INCORRECT_PASSWORD,
  INTERNAL_SERVER_ERROR,
} = PASSPORT;
passport.use(
  "local",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: EMPLOYEEID,
      passwordField: PASSWORD,
    },
    async (req, employeeId, password, done) => {
      try {
        const user = await employees.findOne({ employeeId: employeeId });
        if (!user) {
          return done(
            new AppError(STATUS_CODES.BAD_REQUEST, EMPLOYEE_NOT_FOUND, ""),
            null
          );
        }
        const decryptedPassword = decryptPassword(password, user.password);
        if (!decryptedPassword) {
          return done(
            new AppError(STATUS_CODES.BAD_REQUEST, INCORRECT_PASSWORD, ""),
            null
          );
        }
        req.employee = user;
        return done(null, user);
      } catch (err) {
        return done(
          new AppError(
            STATUS_CODES.INTERNAL_SERVER_ERROR,
            INTERNAL_SERVER_ERROR,
            ""
          ),
          null
        );
      }
    }
  )
);

module.exports = passport;
