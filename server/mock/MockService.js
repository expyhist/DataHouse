const BaseService = require('../src/service/BaseService');
const MockDao = require('./MockDao');

class MockService extends BaseService {
  constructor() {
    super(MockDao);
  }
}

module.exports = new MockService();
