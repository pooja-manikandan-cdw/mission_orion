const { loginServices, registerServices } = require("../services/authServices");

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
