const Role = require('../models/RoleModel');
const BaseDao = require('./BaseDao');

class RoleDao extends BaseDao {
  constructor() {
    super('roles', Role);
    this.model = super.getModel();
  }
}

module.exports = new RoleDao();
