const cron = require("node-cron");
const employees = require("../models/employee.model");
const _ = require("lodash");
const { CDW_EMPLOYEE_MOCK } = require("../constants/apiEndpoint.contants");
const { APPROVAL_STATUS } = require("../constants");

/**
 * @description remove coworker not present in cdw
 */
const updateCoworkers = async () => {
  const response = await fetch(CDW_EMPLOYEE_MOCK);
  if (response?.status !== 200) return null;
  const data = await response.json();
  const employee = await employees.find();
  const inActiveCoworker = employee.filter((x) => !data.includes(x));
  inActiveCoworker.forEach(async (coworker) => {
    await employees.deleteOne({ email: coworker.email });
  });
};

/**
 * @description remove rejected coworked from database
 */
const removeRejectedCoworkers = async () => {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const rejectedEmployee = await employees.deleteMany({
    approvalStatus: APPROVAL_STATUS.REJECTED,
    timestamp: {
      $lte: twoDaysAgo,
    },
  });
};

cron.schedule("0 0 20 * * *", updateCoworkers);
cron.schedule("0 00 * * *", removeRejectedCoworkers);
