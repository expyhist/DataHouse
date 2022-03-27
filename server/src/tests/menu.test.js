const MenuDao = require('../dao/MenuDao');
const MenuService = require('../service/MenuService');

module.exports = (testConnection) => {
  describe('test menu', () => {
    const menuDaoInstance = new MenuDao(testConnection);
    const menuServiceInstance = new MenuService(menuDaoInstance);

    afterAll(async () => {
      await menuDaoInstance.deleteMany({});
    });

    test('Create: should not create a menu when path is invalid', async () => {
      const body = {
        path: 'test',
        name: 'test',
        icon: 'test',
        auth: 'test',
        parentPath: 'test',
      };
      const res = await menuServiceInstance.baseCreate(body);
      expect(res.success).toBe(false);
      expect(res.error).toBe('ValidationError: path: test is not a valid path!');
    });
  });
};
