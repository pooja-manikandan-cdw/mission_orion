const fs = require("fs");
const { BUDDY_JSON_FILENAME } = require("../constants/index");
const { readFile, writeFile } = require("../utils/fileHelper");
const {findItem} = require("../utils/dataHelper");

const getAllBuddies = (req, res) => {
  const data = JSON.parse(readFile(BUDDY_JSON_FILENAME))?.data;
  return data;
  
};

const getBuddy = (req, res) => {
  const employeeId = req.params.employeeId;
  const data = JSON.parse(readFile(BUDDY_JSON_FILENAME))?.data;
  const buddy = findItem(data, Number(employeeId), "employeeId");
  return buddy;
};

const addBuddy = (req, res) => {
  const buddy = req.body;
  const data = JSON.parse(readFile(BUDDY_JSON_FILENAME))?.data;
  const buddyFound = findItem(data, buddy.employeeId, "employeeId")
  if(!buddyFound) {
    data.push(buddy);
    const response = writeFile(BUDDY_JSON_FILENAME, { data: data })
  }
  return buddyFound;
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
    }
    return index;
 };

const deleteBuddy = (req, res) => {
  const employeeId = req.params.employeeId;
  let data = JSON.parse(readFile(BUDDY_JSON_FILENAME))?.data;
  const index = data.findIndex((buddy) => buddy.employeeId == employeeId);
  if(index>=0) {
    data = [...data.slice(0, index), ...data.slice(index + 1)];
    const response = writeFile(BUDDY_JSON_FILENAME, { data: data })
  }
  return index;
};

module.exports = {
  getAllBuddies,
  getBuddy,
  addBuddy,
  deleteBuddy,
  updateBuddy,
};
