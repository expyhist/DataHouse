const ApiTableDao = require('../dao/ApiTableDao');
const ApiTableService = require('../service/ApiTableService');
const MenuDao = require('../dao/MenuDao');

module.exports = (testConnection) => {
  describe('test apitable', () => {
    let newApiTableInfo;
    const apiTableDaoInstance = new ApiTableDao(testConnection);
    const apiTableServiceInstance = new ApiTableService(apiTableDaoInstance);
    const menuDaoInstance = new MenuDao(testConnection);

    test('Create: should not create a config of apitable when url is invalid', async () => {
      const body = {
        url: '1',
        title: '2',
        author: '3',
        applicant: '4',
        defaultParams: '{}',
      };
      try {
        await apiTableServiceInstance.baseCreate(body);
      } catch (error) {
        expect(error.success).toBe(false);
        expect(error.msg).toBe('ValidationError: url: 1 is not a valid url!');
      }
    });

    test('Create: should not create a config of apitable when defaultParams is invalid', async () => {
      const body = {
        url: 'https://www.test.com',
        title: 'test',
        author: 'test',
        applicant: 'test',
        defaultParams: '{1}',
      };
      try {
        await apiTableServiceInstance.baseCreate(body);
      } catch (error) {
        expect(error.success).toBe(false);
        expect(error.msg).toBe('ValidationError: defaultParams: {1} is not a valid json!');
      }
    });

    test('TransCreate: should create a menu when config of apitable is created', async () => {
      const body = {
        url: 'https://www.test.com',
        title: 'test',
        author: 'test',
        applicant: 'test',
        defaultParams: '{}',
      };
      newApiTableInfo = await apiTableServiceInstance.transCreate(body);
      expect(newApiTableInfo.success).toBe(true);
      expect(newApiTableInfo.title).toBe('test');
      expect(newApiTableInfo.info).toBe('配置,菜单');
      expect(newApiTableInfo.message).toBe('apitable created');

      const menuRes = await menuDaoInstance.getOne({ path: `/tables/databoard/${newApiTableInfo.id}` });
      expect(menuRes.auth[0]).toBe('test-ExportTable');
      expect(menuRes.auth[1]).toBe('test-GetTableData');
      expect(menuRes.parentPath).toBe('/tables/databoard/:id');
      expect(menuRes.path).toBe(`/tables/databoard/${newApiTableInfo.id}`);
      expect(menuRes.name).toBe('test');
      expect(menuRes.icon).toBe('');
    });

    test('TransUpdate: should update the name of menu when title of apitable is updated', async () => {
      const body = {
        url: 'https://www.test.com',
        title: 'demo',
        author: 'test',
        applicant: 'test',
        defaultParams: '{}',
      };
      const res = await apiTableServiceInstance.transUpdate(newApiTableInfo.id, body);
      expect(res.success).toBe(true);

      const menuRes = await menuDaoInstance.getOne({ path: `/tables/databoard/${newApiTableInfo.id}` });
      expect(menuRes.name).toBe('demo');
    });

    test('TransDelete: should delete the menu when apitable is deleted', async () => {
      const res = await apiTableServiceInstance.transDelete(newApiTableInfo.id);
      expect(res.success).toBe(true);
      expect(res.info).toBe('配置,菜单');
      expect(res.message).toBe('apitable deleted');
    });
  });
};
