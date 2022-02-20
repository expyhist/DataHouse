const BaseService = require('./BaseService');
const DemandDao = require('../dao/DemandDao');

class DemandService extends BaseService {
  constructor(daoInstance) {
    super(daoInstance || new DemandDao());
  }
}

module.exports = DemandService;
