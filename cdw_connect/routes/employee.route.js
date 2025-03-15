const express = require("express");
const {
  signupEmployeeController,
  signinEmployeeController,
  getPendingUsersController,
  updatePendingUserController,
  getEmployeeDetailsController,
} = require("../controllers/employee.controllers");
const { body, validationResult, query, param } = require("express-validator");
const {
  validateRequiredPayload,
} = require("../middleware/errorHandler.middleware");
const {
  authorizeUser,
  authorizeAdmin,
} = require("../middleware/authorizeUser.middleware");

const router = express.Router();

const validateRequestBody = [
  body("email").notEmpty().withMessage("email is required"),
  body("name").notEmpty().withMessage("name is required"),
  body("employeeId").notEmpty().withMessage("employeeId is required"),
  body("role").notEmpty().withMessage("role is required"),
];
const signinValidation = [
  body("employeeId")
    .notEmpty()
    .withMessage("employeeId is required")
    .bail()
    .matches(/^\d+$/)
    .withMessage("employeeId should be number"),
  body("password").notEmpty().withMessage("password is required"),
];

const approvePendingUserValidation = [
  param("employeeId")
    .notEmpty()
    .withMessage("employeeId is required in path")
    .bail()
    .matches(/^\d+$/)
    .withMessage("employeeId should be number"),
  query("approvalStatus")
    .notEmpty()
    .withMessage("approvalStatus is required in query"),
];

const employeeIdValidation = [
  param("employeeId")
    .notEmpty()
    .withMessage("employeeId is required in path")
    .bail()
    .matches(/^\d+$/)
    .withMessage("employeeId should be number"),
];

router.post(
  "/signup",
  validateRequestBody,
  validateRequiredPayload,
  signupEmployeeController
);

router.post(
  "/signin",
  signinValidation,
  validateRequiredPayload,
  signinEmployeeController
);

router.get(
  "/pending",
  authorizeUser,
  authorizeAdmin,
  getPendingUsersController
);

router.patch(
  "/pending/:employeeId",
  approvePendingUserValidation,
  validateRequiredPayload,
  authorizeUser,
  authorizeAdmin,
  updatePendingUserController
);

router.get(
  "/:employeeId",
  authorizeUser,
  employeeIdValidation,
  validateRequiredPayload,
  getEmployeeDetailsController
);

module.exports = router;
