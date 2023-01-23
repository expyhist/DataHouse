const express = require('express');

const router = express.Router();

const verifyToken = require('../utils/verifyToken');

router.all(/^.*(?<!sign.*|set.*|publickey.*)$/, verifyToken);

require('./ApiTableController')(router);
require('./DemandController')(router);
require('./FilterController')(router);
require('./MenuController')(router);
require('./UserController')(router);
require('./RoleController')(router);

module.exports = router;
