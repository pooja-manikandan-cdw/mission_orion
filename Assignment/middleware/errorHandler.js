const AppError = require("../AppError");
const logger = require("./logger");

const errorHandler = (err, req, res, next) => {
    if(err instanceof AppError) {
        logger.error(err.message)
        return res.status(err.statusCode).json({errorCode: err.errorCode, message:err.message})
    }
    return res.status(400).send({err})
}

module.exports = errorHandler;