const fs = require("fs");
const {
  getAllBuddies,
  getBuddy,
  addBuddy,
  updateBuddy,
  deleteBuddy,
} = require("../services/buddyServices");

const getAllBuddiesController = (req, res) => {
  getAllBuddies(req, res);
};

const getBuddyController = (req, res, next) => {
  getBuddy(req, res, next);
};

const addBuddyController = (req, res) => {
  addBuddy(req, res);
};

const updateBuddyController = (req, res, next) => {
  updateBuddy(req, res, next);
};

const deleteBuddyController = (req, res) => {
  deleteBuddy(req, res);
};

module.exports = {
  getAllBuddiesController,
  getBuddyController,
  addBuddyController,
  deleteBuddyController,
  updateBuddyController,
};
