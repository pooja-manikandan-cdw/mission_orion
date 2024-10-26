const AppError = require("../AppError");
const { STATUS_CODES, MESSAGES } = require("../constants/response.constants");
const users = require("../models/users.model");

const { SUCCESS, NOT_FOUND } = STATUS_CODES;
const { PENDING_USERS_NOT_FOUND, USER_NOT_FOUND, UNABLE_TO_FIND_USER } =
  MESSAGES.FAILURE;

const registerUser = (userDetails) => {};

const updateUser = async (employeeId, user) => {
  const updatedResult = await users.updateOne({ employeeId: employeeId }, user);
  if (updatedResult.modifiedCount) return true;
  throw new AppError(BAD_REQUEST, UNABLE_TO_FIND_USER, "");
};

const getPendingUsers = async () => {
  const pendingUsers = await users.find({ approvalStatus: "pending" });
  if (!pendingUsers || !pendingUsers.length)
    throw new AppError(SUCCESS, PENDING_USERS_NOT_FOUND, "");
  return pendingUsers;
};

const updatePendingUser = async (id) => {
  const updatedResult = await users.updateOne(
    { employeeId: id },
    { approvalStatus: "approved" }
  );
  if (updatedResult.modifiedCount) return true;
  throw new AppError(NOT_FOUND, USER_NOT_FOUND, "");
};

module.exports = {
  getPendingUsers,
  updatePendingUser,
  updateUser,
  registerUser,
};
