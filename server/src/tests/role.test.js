const RoleDao = require('../dao/RoleDao');

module.exports = (testConnection) => {
  describe('test role', () => {
    const roleDaoInstance = new RoleDao(testConnection);

    afterAll(async () => {
      await roleDaoInstance.deleteMany({});
    });
  });
};
