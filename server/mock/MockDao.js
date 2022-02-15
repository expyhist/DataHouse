const Mock = require('./MockModel');
const BaseDao = require('../src/dao/BaseDao');

class MockDao extends BaseDao {
  constructor() {
    super('mocks', Mock);
    this.model = super.getModel();
  }
}

module.exports = new MockDao();
