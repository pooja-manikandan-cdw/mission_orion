const { createLogger, format, transports } = require("winston");
require("dotenv").config();

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf((info) => {
      return `${info.level} - ${info.message} - ${info.timestamp}`;
    })
  ),
  transports: [
    new transports.Console({ level: process.env.LOGGER_LEVEL }),
    new transports.File({
      filename: process.env.LOGGER_FILENAME,
      level: process.env.LOGGER_LEVEL,
    }),
  ],
});

module.exports = logger;
