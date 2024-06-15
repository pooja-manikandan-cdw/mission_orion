const express = require('express');
const logger = require('./logger');

const app = express();

logger.error('Error');
logger.warn('warn');
logger.info('info');
logger.verbose('verbose');
logger.debug('Debug');
logger.silly('silly')



app.listen(8080, (req, res)=>{
    console.log('app listening at port 8080')
    logger.info('app listening at port 8080')
})