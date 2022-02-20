const Demand = require('../models/DemandModel');
const BaseDao = require('./BaseDao');

class DemandDao extends BaseDao {
  constructor(connection) {
    super('demands', Demand, connection);
    this.model = super.getModel();
  }
}

module.exports = DemandDao;
