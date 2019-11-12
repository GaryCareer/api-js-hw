const log4js = require('log4js');
const { SERVICE } = require('../constants');

const {
  LOG_LEVEL = SERVICE.LOG_LEVEL,
} = process.env;

const logger = log4js.getLogger();
logger.level = LOG_LEVEL;

module.exports = logger;
