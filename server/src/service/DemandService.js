const BaseService = require('./BaseService');
const DemandDao = require('../dao/DemandDao');

class DemandService extends BaseService {
  constructor() {
    super(DemandDao);
  }
}

module.exports = new DemandService();
