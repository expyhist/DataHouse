const RoleDao = require('../dao/RoleDao');
const RoleService = require('../service/RoleService');

module.exports = (testConnection) => {
  describe('test role', () => {
    const roleDaoInstance = new RoleDao(testConnection);
    const roleServiceInstance = new RoleService(roleDaoInstance);

    afterAll(async () => {
      await roleDaoInstance.deleteMany({});
    });

    test('TransCreate: should not create a user when name is invalid', async () => {
      const body = {
        auth: [
          { '/path': [] },
          { '/path/1': [] },
          { '/path/2': ['1', '2'] },
          { '/path/1/1': [] },
          { '/path/1/2': ['1', '2'] },
        ],
      };
      try {
        await roleServiceInstance.baseCreate(body);
      } catch (error) {
        expect(error.success).toBe(false);
        expect(error.msg).toBe('ValidationError: name: Path `name` is required.');
      }
    });
  });
};
