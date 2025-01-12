const express = require("express");
const {
  signupEmployeeController,
  signinEmployeeController,
  getPendingUsersController,
} = require("../controllers/employee.controllers");

const router = express.Router();

router.post("/signup", signupEmployeeController);

router.post("/signin", signinEmployeeController);

router.get("/pending", getPendingUsersController);

router.patch("/pending/:employeeId");

module.exports = router;
