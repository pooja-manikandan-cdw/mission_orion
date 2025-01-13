const express = require("express");
const {
  signupEmployeeController,
  signinEmployeeController,
  getPendingUsersController,
  updatePendingUserController,
} = require("../controllers/employee.controllers");

const router = express.Router();

router.post("/signup", signupEmployeeController);

router.post("/signin", signinEmployeeController);

router.get("/pending", getPendingUsersController);

router.patch("/pending/:employeeId", updatePendingUserController);

module.exports = router;
