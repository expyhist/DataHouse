const mongoose = require('mongoose');
const dbConfig = require('../config/db-config');

const connection = mongoose.createConnection(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB_TEST}`, dbConfig.CONNECTIONOPTIONS);
connection
  .then(() => console.log('Successfully connect to MongoDB Test.'))
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

module.exports = connection;
