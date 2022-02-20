const BaseService = require('../service/BaseService');
const MockDao = require('./MockDao');

class MockService extends BaseService {
  constructor(daoInstance) {
    super(daoInstance || new MockDao());
  }
}

module.exports = MockService;
