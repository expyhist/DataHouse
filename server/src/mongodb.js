const mongoose = require('mongoose');
const { format } = require('date-fns');
const log = require('npmlog');

const dbConfig = require('./config/db-config');

const { HOST, PORT, DB } = dbConfig;

const connection = mongoose.createConnection(`mongodb://${HOST}:${PORT}/${DB}`, dbConfig.CONNECTIONOPTIONS);
connection
  .then(() => log.info(`[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}]`, `MongoDB is connecting on mongodb://${HOST}:${PORT}/${DB}`))
  .catch((e) => {
    log.error(`[${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}]`, `Connection error: ${e}`);
    process.exit();
  });

module.exports = connection;
