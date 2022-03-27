const RoleDao = require('../dao/RoleDao');
const RoleService = require('../service/RoleService');

module.exports = (testConnection) => {
  describe('test role', () => {
    const roleDaoInstance = new RoleDao(testConnection);
    const roleServiceInstance = new RoleService(roleDaoInstance);

    afterAll(async () => {
      await roleDaoInstance.deleteMany({});
    });
  });
};
