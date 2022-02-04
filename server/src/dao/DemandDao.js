const Demand = require('../models/DemandModel');
const BaseDao = require('./BaseDao');

class DemandDao extends BaseDao {
  constructor() {
    super('demands', Demand);
    this.model = super.getModel();
  }
}

module.exports = new DemandDao();
