const ApiTable = require('../models/ApiTableModel');
const BaseDao = require('./BaseDao');

class ApiTableDao extends BaseDao {
  constructor() {
    super('apitables', ApiTable);
    this.model = super.getModel();
  }
}

module.exports = new ApiTableDao();
