const cron = require("node-cron");
const employees = require("../models/employee.model");
const _ = require('lodash');
const { CDW_EMPLOYEE_MOCK } = require("../constants/apiEndpoint.contants");

const updateCoworkers = async() => {
    console.log("came here");
    const response = await fetch(CDW_EMPLOYEE_MOCK);
    console.log('response', response)
    if(response?.status !== 200)
        return null;
    const data = await response.json();
    const employee = await employees.find();
    console.log(data, employee)
    console.log(_.isEqual(data, employee))
    const inActiveCoworker = employee.filter(x => !data.includes(x));
    inActiveCoworker.forEach(async(coworker) => {
        await employees.deleteOne({email: coworker.email})
    })
};

cron.schedule("* * 20 * * *", updateCoworkers);
