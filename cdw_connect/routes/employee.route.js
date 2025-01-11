const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const {
  signupEmployeeController,
  signinEmployeeController,
  getPendingUsersController,
} = require("../controllers/employee.controllers");
const { setResponse } = require("../utils/response.utils");

const router = express.Router();

router.post("/signup", signupEmployeeController);

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    console.log("user", user);
    if (err) {
      console.log("err", err);
      next(err);
    }

    if (user) {
      const token = jwt.sign({employeeId: user.employeeId, role: user.role},  process.env.SECRET_KEY, {
        expiresIn: "3000s",
      });
      // return token;
      setResponse(res, 200, true, false, "logged in successfully", token);
    }
  })(req, res, next);
});

router.get("/pending", getPendingUsersController);

router.patch("/pending/:employeeId");

module.exports = router;
