const Mock = require('./MockModel');
const BaseDao = require('../dao/BaseDao');

class MockDao extends BaseDao {
  constructor(connection) {
    super('mocks', Mock, connection);
    this.model = super.getModel();
  }
}

module.exports = MockDao;
