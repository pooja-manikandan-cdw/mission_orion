const {createLogger, transports, format} = require('winston');

const logger = createLogger({
    format: format.combine(format.timestamp(), format.printf((info) => {
        return `${info.level} - ${info.message} - ${info.timestamp}`
    })),
    transports: [
        new transports.Console({level:'silly'}),
        new transports.File({filename: 'app.log', level: 'info'})

    ]
});

module.exports = logger;