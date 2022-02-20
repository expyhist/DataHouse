const ApiTable = require('../models/ApiTableModel');
const BaseDao = require('./BaseDao');

class ApiTableDao extends BaseDao {
  constructor(connection) {
    super('apitables', ApiTable, connection);
    this.model = super.getModel();
  }
}

module.exports = ApiTableDao;
