const APPROVAL_STATUS = {
  STATUS: ["approved", "rejected"],
  REJECTED: "rejected",
  PENDING: "pending",
};

const ROLE = {
  ADMIN: "admin",
  CO_WORKER: "co-worker",
};

const EMAIL_DETAILS = {
  TITLE: "CDW CONNECT",
  MAIL: "pooja17122@gmail.com",
};

const AUTHORIZATION_CONSTANTS = {
  AUTHORIZATION: "authorization",
  UNAUTHORIZED_USER: "User is not authorized",
  SESSION_EXPIRED: "Session expired Login again",
  COWORKER_UNAUTHORIZED: "Co-worker is not authorized to view this",
};

const PASSPORT = {
  EMPLOYEEID: "employeeId",
  PASSWORD: "password",
  EMPLOYEE_NOT_FOUND: "Employee not found",
  INCORRECT_PASSWORD: "Incorrect password",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
};
module.exports = {
  APPROVAL_STATUS,
  ROLE,
  EMAIL_DETAILS,
  AUTHORIZATION_CONSTANTS,
  PASSPORT,
};
