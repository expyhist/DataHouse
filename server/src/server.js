const express = require('express');
const cors = require('cors');
const router = require('./routes');

module.exports = () => {
  const app = express();
  const corsOptions = {
    origin: 'http://localhost:8080',
  };

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use('/api', router);
  return app;
};
