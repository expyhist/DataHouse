const testConnection = require('./testMongodb');
const ApiTableDao = require('../dao/ApiTableDao');
const ApiTableService = require('../service/ApiTableService');
const MenuDao = require('../dao/MenuDao');

describe('test apitable', () => {
  const apiTableDaoInstance = new ApiTableDao(testConnection);
  const apiTableServiceInstance = new ApiTableService(apiTableDaoInstance);
  const menuDaoInstance = new MenuDao(testConnection);

  afterAll(async () => {
    await apiTableDaoInstance.deleteMany({});
    await menuDaoInstance.deleteMany({});
    await testConnection.close();
  });

  test('Create: should not create a config of apitable when url is invalid', async () => {
    const body = {
      url: '1',
      title: '2',
      author: '3',
      applicant: '4',
      defaultParams: '{}',
    };
    const res = await apiTableServiceInstance.baseCreate(body);
    expect(res.success).toBe(false);
    expect(res.error).toBe('ValidationError: url: 1 is not a valid url!');
  });

  test('Create: should not create a config of apitable when defaultParams is invalid', async () => {
    const body = {
      url: 'https://www.test.com',
      title: 'test',
      author: 'test',
      applicant: 'test',
      defaultParams: '{1}',
    };
    const res = await apiTableServiceInstance.baseCreate(body);
    expect(res.success).toBe(false);
    expect(res.error).toBe('ValidationError: defaultParams: Unexpected number in JSON at position 1');
  });

  let newApiTableInfo;

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

    const menuInfo = await menuDaoInstance.getOne({ path: `/tables/databoard/${newApiTableInfo.id}` });
    expect(menuInfo.auth[0]).toBe('test-ExportTable');
    expect(menuInfo.auth[1]).toBe('test-GetTableData');
    expect(menuInfo.parentPath).toBe('/tables/databoard/:id');
    expect(menuInfo.path).toBe(`/tables/databoard/${newApiTableInfo.id}`);
    expect(menuInfo.name).toBe('test');
    expect(menuInfo.icon).toBe('');
  });

  test('TransUpdate: should update the name of menu when title of apitable is updated', async () => {
    const body = {
      url: 'https://www.test.com',
      title: 'demo',
      author: 'test',
      applicant: 'test',
      defaultParams: '{}',
    };
    const apiTableInfo = await apiTableServiceInstance.transUpdate(newApiTableInfo.id, body);
    expect(apiTableInfo.success).toBe(true);

    const menuInfo = await menuDaoInstance.getOne({ path: `/tables/databoard/${newApiTableInfo.id}` });
    expect(menuInfo.name).toBe('demo');
  });
});
