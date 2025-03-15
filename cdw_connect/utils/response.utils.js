const logger = require("./logger.utils");

/**
 * @description sends response to the server
 * @param {Object} res response object
 * @param {Number} status status code
 * @param {Boolean} success success boolean
 * @param {Boolean} error error flag
 * @param {String} message response message
 * @param {Object} data response data
 * @returns response
 */
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
