const { loginServices, registerServices } = require("../services/authServices");

/**
 * @description calls logins services with req body passed
 * @param {object} req 
 * @param {object} res 
 * @param {Function} next 
 */
const loginController = async (req, res, next) => {
  try {

    const response = await loginServices(req.body);
    if (response) {
      res
        .status(200)
        .send({ status: 200, message: "login successfull", token: response });
    }
  } catch (error) {
    next(error)
  }
};

/**
 * @description calls register services with req body passed
 * @param {object} req 
 * @param {object} res 
 * @param {Function} next 
 */
const registerController = async (req, res, next) => {
  try {
    const response = await registerServices(req.body);
    if (response)
      res
        .status(201)
        .send({ status: 201, message: "User registered successfully" });
  } catch(error) {
    next(error)
  }
};

module.exports = { loginController, registerController };
