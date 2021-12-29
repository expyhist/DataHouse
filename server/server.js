const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const dbConfig = require('./config/db-config');
const router = require('./routes');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8080',
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', router);

mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, dbConfig.CONNECTIONOPTIONS)
  .then(() => {
    console.log('Successfully connect to MongoDB.');
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

const Port = process.env.PORT || 3000;
const server = app.listen(Port, () => console.log(`Server running on port ${Port}`));
server.setTimeout(0);
