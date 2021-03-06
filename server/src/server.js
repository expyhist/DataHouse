const express = require('express');
const helmet = require('helmet');

const router = require('./routes');

module.exports = () => {
  const app = express();

  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/api', router);

  return app;
};
