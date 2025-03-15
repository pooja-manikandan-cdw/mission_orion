const bcrypt = require("bcrypt");
require("dotenv").config();

const SALT = Number(process.env.SALT);

/**
 * @description encrypts password using bcrypt
 * @param {String} password
 * @returns hashed password
 */
const encryptPassword = (password) => {
  try {
    const hashedPassword = bcrypt.hashSync(password, SALT);
    return hashedPassword;
  } catch (err) {
    return err;
  }
};

/**
 * @description decrypts password using bcrypt
 * @param {String} password
 * @returns  password
 */
const decryptPassword = (password, hashedPasword) => {
  try {
    const result = bcrypt.compareSync(password, hashedPasword);
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = { encryptPassword, decryptPassword };
