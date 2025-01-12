const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const employees = require("../models/employee.model");  // Adjust this to your actual model path
const AppError = require("../AppError");   // Assuming custom error handling function
const { decryptPassword } = require("../utils/dataEncryption.utils");

passport.use(
  "local",
  new LocalStrategy(
    { passReqToCallback: true },  // Optional: Pass req to callback if needed
    async (req, username, password, done) => {
      console.log("Attempting to authenticate user:", username);  // Log this to check if strategy is triggered

      try {
        // Attempt to find user by employeeId (username)
        const user = await employees.findOne({ employeeId: username });

        if (!user) {
          console.log("User not found");
          return done(new AppError(404, "User not found", ""), null);
        }

        // Assuming decryptPassword is a function to decrypt password, use a bcrypt method instead if needed
        const decryptedPassword = decryptPassword(password, user.password);
        console.log("Decrypted password check:", decryptedPassword);  // Log this to verify password decryption

        if (!decryptedPassword) {
          console.log("Incorrect password");
          return done(new AppError(401, "Incorrect password", ""), null);
        }

        // If everything checks out, pass the user to the next middleware
        console.log("User authenticated:", user);
        req.user = user;
        return done(null, user);
      } catch (err) {
        console.error("Error in LocalStrategy:", err);
        return done(new AppError(500, "Internal Server Error", ""), null);
      }
    }
  )
);

module.exports = passport;
