const AppError = require("../AppError");
const jwt = require('jsonwebtoken');
const { MESSAGES, STATUS_CODES } = require("../constants/response.constants");

const authorizeUser = (req, res, next) => {
  const header = req.headers['authorization'];
    const token = header && header.split(' ')[1]
    if(!token) throw new AppError(401, 'User is not authorized', 'UNAUTHORIZED_USER');
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) {
            throw new AppError(401, 'Session expired Login again', '');
        }
        req.user = user;
        next();
    })
};

module.exports = { authorizeUser };
