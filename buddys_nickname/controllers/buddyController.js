const fs = require("fs");
const {
  getAllBuddies,
  getBuddy,
  addBuddy,
  updateBuddy,
  deleteBuddy,
} = require("../services/buddyServices");

const getAllBuddiesController = (req, res) => {
  const data = getAllBuddies(req, res);
  res.send({
    status: 200,
    data,
  });
};

const getBuddyController = (req, res) => {
  const data = getBuddy(req, res);
  if(data) {
    res.send({
      status: 200,
      data: data,
    });
  } else if(!data) {
    res.status(200).send({
      status: 204,
      message: 'Buddy not found',
    });
  }
};

const addBuddyController = (req, res) => {
  const data = addBuddy(req, res);
  if(data) {
    res.status(400).send({ status: 400, message: "Buddy already exist" });
  } else {
    res.status(200).send({ status: 201, message: "Buddy added successfully" });
  }
};

const updateBuddyController = (req, res) => {
  const data = updateBuddy(req, res);
  if(data>=0) {
    res.status(200).send({ status: 200, message: "Buddy updated successfully" });
  } else {
    res.status(200).send({
      status: 204,
      message: 'Buddy not found',
    });
  }
};

const deleteBuddyController = (req, res) => {
  const data = deleteBuddy(req, res);
  if(data>=0) {
    res.status(200).send({ status: 200, message: "Buddy deleted successfully" });
  } else {
    res.status(200).send({
      status: 204,
      message: 'Buddy not found',
    });
  }
};

module.exports = {
  getAllBuddiesController,
  getBuddyController,
  addBuddyController,
  deleteBuddyController,
  updateBuddyController,
};
