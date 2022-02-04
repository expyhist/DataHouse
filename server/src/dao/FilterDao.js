const Filter = require('../models/FilterModel');
const BaseDao = require('./BaseDao');

class FilterDao extends BaseDao {
  constructor() {
    super('filters', Filter);
    this.model = super.getModel();
  }
}

module.exports = new FilterDao();
