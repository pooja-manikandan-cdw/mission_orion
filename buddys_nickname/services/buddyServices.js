const fs = require("fs");
const { BUDDY_JSON_FILENAME } = require("../constants/index");
const { readFile, writeFile } = require("../utils/fileHelper");
const {findItem} = require("../utils/dataHelper");

const getAllBuddies = (req, res) => {
  const data = JSON.parse(readFile(BUDDY_JSON_FILENAME))?.data;
  res.send({
    status: 200,
    data,
  });
};

const getBuddy = (req, res) => {
  const employeeId = req.params.employeeId;
  const data = JSON.parse(readFile(BUDDY_JSON_FILENAME))?.data;
  const buddy = findItem(data, Number(employeeId), "employeeId");
  if(buddy) {
    res.send({
      status: 200,
      data: buddy,
    });
  } else if(!buddy) {
    res.status(200).send({
      status: 204,
      message: 'Buddy not found',
    });

  }
};

const addBuddy = (req, res) => {
  const buddy = req.body;
  const data = JSON.parse(readFile(BUDDY_JSON_FILENAME))?.data;
  if(!findItem(data, buddy.employeeId, "employeeId")) {
    data.push(buddy);
    const response = writeFile(BUDDY_JSON_FILENAME, { data: data })
    res.status(200).send({ status: 201, message: "Buddy added successfully" });
  } else {
    res.status(400).send({ status: 400, message: "Buddy already exist" });
  }
};

const updateBuddy = (req, res) => {
    const buddy = req.body;
    const employeeId = req.params.employeeId;
    let data = JSON.parse(readFile(BUDDY_JSON_FILENAME))?.data;
    const index = data.findIndex((buddy) => buddy.employeeId == employeeId);
    if(index>=0) {
      const updatesBuddyDetails = {...data[index], ...buddy}
      data = [...data.slice(0, index), {...updatesBuddyDetails}, ...data.slice(index + 1)];
      const response = writeFile(BUDDY_JSON_FILENAME, { data: data })
      res.status(200).send({ status: 200, message: "Buddy updated successfully" });
    } else if(index === -1) {
      res.status(200).send({
        status: 204,
        message: 'Buddy not found',
      });
    }
 };

const deleteBuddy = (req, res) => {
  const employeeId = req.params.employeeId;
  let data = JSON.parse(readFile(BUDDY_JSON_FILENAME))?.data;
  const index = data.findIndex((buddy) => buddy.employeeId == employeeId);
  if(index>=0) {
    data = [...data.slice(0, index), ...data.slice(index + 1)];
    const response = writeFile(BUDDY_JSON_FILENAME, { data: data })
    res.status(200).send({ status: 200, message: "Buddy deleted successfully" });
  } else if(index === -1) {
    res.status(200).send({
      status: 204,
      message: 'Buddy not found',
    });
  }
};

module.exports = {
  getAllBuddies,
  getBuddy,
  addBuddy,
  deleteBuddy,
  updateBuddy,
};
