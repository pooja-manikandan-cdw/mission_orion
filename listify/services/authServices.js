const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  encryptPassword,
  decryptPassword,
} = require("../utils/dataEncryptionUtils");
const { writeIntoFile, readFromFile } = require("../utils/fileSystemUtils");
const { checkEntireExists } = require("../utils/dataManipulationUtils");
const AppError = require("../AppError");

/**
 * @description checks for valid username and password on success returns jwt token
 * @param {object} requestBody
 * @returns returns the token on successful login
 */
const loginServices = async (requestBody) => {
  if (!requestBody.password || !requestBody.username) {
    throw new AppError(400, "Recheck missing payload", "MISSING_PAYLOAD");
  }
  const users = readFromFile("data/users.json");
  const userFound = checkEntireExists(users, requestBody.username, "username");
  if (!userFound)
    throw new AppError(
      404,
      "Invalid credentials user not found",
      "USER_NOT_FOUND"
    );
  if (userFound) {
    const { username } = requestBody;
    const valid = decryptPassword(requestBody.password, userFound.password);
    if (!valid)
      throw new AppError(
        404,
        "Invalid credentials password incorrect",
        "USER_NOT_FOUND"
      );
    if (valid) {
      const token = jwt.sign({ username }, process.env.SECRET_KEY, {
        expiresIn: "300s",
      });
      return token;
    }
  }
};

/**
 * @description checks for valid username and password on success registers the user in user json file
 * @param {*} param - contains username password
 * @returns registered user
 */
const registerServices = async ({ username, password }) => {
  if (!password || !username) {
    throw new AppError(400, "Recheck missing payload", "MISSING_PAYLOAD");
  }
  const hashedPassword = encryptPassword(password);
  let users = readFromFile("data/users.json");
  let userExists;
  if (users) {
    userExists = checkEntireExists(users, username, "username");
    if (!userExists)
      users.push({ username: username, password: hashedPassword });
    else {
      throw new AppError(400, "User already exist", "USER_EXIST");
    }
  } else {
    users = [{ username: username, password: hashedPassword }];
  }
  if (!userExists || !users) {
    writeIntoFile("data/users.json", JSON.stringify(users, null, 2));
    return users;
  }
};

module.exports = { loginServices, registerServices };
