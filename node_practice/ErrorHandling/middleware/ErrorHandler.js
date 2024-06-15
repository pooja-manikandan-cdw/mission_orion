const AppError = require("../utils/AppError");

const ErrorHandler = (err, req, res, next) => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({errorCode: err.errorCode, message: err.message})
    }
    return res.status(400).send(err.message)
}

module.exports = ErrorHandler;