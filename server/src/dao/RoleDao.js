const Role = require('../models/RoleModel');
const BaseDao = require('./BaseDao');

class RoleDao extends BaseDao {
  constructor(connection) {
    super('roles', Role, connection);
    this.model = super.getModel();
  }
}

module.exports = RoleDao;
