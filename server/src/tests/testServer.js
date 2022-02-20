const express = require('express');
const helmet = require('helmet');

const router = express.Router();

const MockController = require('../mock/MockController');

module.exports = (service) => {
  const app = express();

  MockController(router, service);

  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/api/test', router);

  return app;
};
