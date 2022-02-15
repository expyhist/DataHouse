const express = require('express');
const helmet = require('helmet');

const router = express.Router();

require('../mock/MockController')(router);

module.exports = () => {
  const app = express();

  app.use(helmet());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/api/test', router);

  return app;
};
