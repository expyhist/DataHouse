const express = require('express');

const verifyToken = require('../utils/verifyToken');

const router = express.Router();

router.all(/^.*(?<!sign.*|set.*)$/, verifyToken);

require('./ApiTableController')(router);
require('./DemandController')(router);
require('./FilterController')(router);
require('./MenuController')(router);
require('./UserController')(router);
require('./RoleController')(router);

module.exports = router;
