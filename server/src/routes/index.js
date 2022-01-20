const express = require('express');

const verifyToken = require('../utils/verifyToken');

const router = express.Router();

router.all(/^.*?(?<!sign.*)$/, verifyToken);

require('./apitable-routes')(router);
require('./demand-routes')(router);
require('./filter-routes')(router);
require('./menu-routes')(router);
require('./user-routes')(router);
require('./role-routes')(router);

module.exports = router;
