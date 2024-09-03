const AppError = require("../AppError");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authoriseUser = (req, res, next) => {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1]
    if(!token) throw new AppError(401, 'User is not authorized', 'UNAUTHORIZED_USER');
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) {
            throw new AppError(401, 'Session expired Login again', 'TOKEN_EXPIRED');
        }
        req.user = user;
        next();
    })
}

module.exports = { authoriseUser }