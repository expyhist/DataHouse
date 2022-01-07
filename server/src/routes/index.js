const express = require('express');

const router = express.Router();

require('./apitable-routes')(router);
// require('./auth-routes')(router);
require('./demand-routes')(router);
require('./filter-routes')(router);
require('./menu-routes')(router);
require('./user-routes')(router);

module.exports = router;
