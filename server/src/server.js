const express = require('express');
const cors = require('cors');
// const session = require('express-session');

const router = require('./routes');

module.exports = () => {
  const app = express();

  const corsOptions = {
    origin: 'http://localhost:8080',
  };

  // const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
  // app.use(session({
  //   secret: 'test',
  //   name: 'test',
  //   resave: true,
  //   saveUninitialized: true,
  //   rolling: true,
  //   keys: ['key1', 'key2'],
  //   cookie: {
  //     secure: true,
  //     httpOnly: true,
  //     path: '/',
  //     expires: expiryDate,
  //   },
  // }));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use('/api', router);
  return app;
};
