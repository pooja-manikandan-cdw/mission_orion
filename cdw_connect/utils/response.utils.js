const logger = require("./logger.utils");

const setResponse = (res, status, success, error, message, data) => {
  if (success) logger.info(message);
  return res.status(status).send({
    success: success,
    error: error,
    message: message,
    data: data,
  });
};

module.exports = { setResponse };
