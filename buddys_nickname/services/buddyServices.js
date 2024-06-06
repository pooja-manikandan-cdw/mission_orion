const fs = require("fs");
const { BUDDY_JSON_FILENAME } = require("../constants/index");
const { readFile, writeFile } = require("../utils/fileHelper");

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
  const response = data.find((buddy) => buddy.employeeId == employeeId);
  if(response) {
    res.send({
      status: 200,
      data: response,
    });
  } else if(!response) {
    res.send({
      status: 404,
      message: 'Buddy not found',
    });

  }
};

const addBuddy = (req, res) => {
  const buddy = req.body;
  const data = JSON.parse(readFile(BUDDY_JSON_FILENAME))?.data;
  data.push(buddy);
  const response = writeFile(BUDDY_JSON_FILENAME, { data: data })
  res.send({ status: 201, message: "Buddy added successfully" });
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
      res.send({ status: 201, message: "Buddy added successfully" });
    } else if(index === -1) {
      res.send({
        status: 404,
        message: 'Buddy not found',
      });
    }
 };

const deleteBuddy = (req, res) => {
  const employeeId = req.params.employeeId;
  let data = JSON.parse(readFile(BUDDY_JSON_FILENAME))?.data;
  const index = data.findIndex((buddy) => buddy.employeeId == employeeId);
  data = [...data.slice(0, index), ...data.slice(index + 1)];
  const response = writeFile(BUDDY_JSON_FILENAME, { data: data })
  res.send({ status: 201, message: "Buddy deleted successfully" });
};

module.exports = {
  getAllBuddies,
  getBuddy,
  addBuddy,
  deleteBuddy,
  updateBuddy,
};
