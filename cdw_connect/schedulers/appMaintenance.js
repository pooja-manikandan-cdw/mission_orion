const cron = require("node-cron");
const employees = require("../models/employee.model");
const _ = require("lodash");
const { CDW_EMPLOYEE_MOCK } = require("../constants/apiEndpoint.contants");

const updateCoworkers = async () => {
  console.log("came here");
  const response = await fetch(CDW_EMPLOYEE_MOCK);
  console.log("response", response);
  if (response?.status !== 200) return null;
  const data = await response.json();
  const employee = await employees.find();
  console.log(data, employee);
  console.log(_.isEqual(data, employee));
  const inActiveCoworker = employee.filter((x) => !data.includes(x));
  inActiveCoworker.forEach(async (coworker) => {
    await employees.deleteOne({ email: coworker.email });
  });
};

const removeRejectedCoworkers = async () => {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  console.log('here', twoDaysAgo)
  const rejectedEmployee = await employees.deleteMany({
    approvalStatus: "rejected",
    timestamp: {
      $lte: twoDaysAgo,
    },
  });
};

cron.schedule("* * 20 * * *", updateCoworkers);
cron.schedule("* 00 * * *", removeRejectedCoworkers);
