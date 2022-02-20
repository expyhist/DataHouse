const Filter = require('../models/FilterModel');
const BaseDao = require('./BaseDao');

class FilterDao extends BaseDao {
  constructor(connection) {
    super('filters', Filter, connection);
    this.model = super.getModel();
  }
}

module.exports = FilterDao;
