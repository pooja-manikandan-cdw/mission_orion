const express = require("express");

const router = express.Router();

router.post("/signup");

router.post("/login");

router.get("/pending");

router.patch("/pending/:employeeId");
