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

const getBuddyController = (req, res) => {
  getBuddy(req, res);
};

const addBuddyController = (req, res) => {
  addBuddy(req, res);
};

const updateBuddyController = (req, res) => {
  updateBuddy(req, res);
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
