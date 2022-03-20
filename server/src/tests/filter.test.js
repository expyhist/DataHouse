const testConnection = require('./testMongodb');
const FilterService = require('../service/FilterService');
const FilterDao = require('../dao/FilterDao');
const ApiTableDao = require('../dao/ApiTableDao');
const ApiTableService = require('../service/ApiTableService');
const MenuDao = require('../dao/MenuDao');

describe('test filter', () => {
  const filterDaoInstance = new FilterDao(testConnection);
  const filterServiceInstance = new FilterService(filterDaoInstance);
  const apiTableDaoInstance = new ApiTableDao(testConnection);
  const apiTableServiceInstance = new ApiTableService(apiTableDaoInstance);
  const menuDaoInstance = new MenuDao(testConnection);

  afterAll(async () => {
    await apiTableDaoInstance.deleteMany({});
    await filterDaoInstance.deleteMany({});
    await menuDaoInstance.deleteMany({});
    await testConnection.close();
  });

  test('TransCreate: should not create a filter when apiTableId of body is not existent', async () => {
    const body = {
      rangeDate: [{
        title: 'test',
        startDate: 'start_date',
        endDate: 'end_date',
      }],
    };
    const filterInfo = await filterServiceInstance.transCreate(body);
    expect(filterInfo.success).toBe(false);
    expect(filterInfo.error).toBe('Error: apiTableId is not existent');
  });

  let newApiTableInfo;

  test('TransCreate: should create a filters of connection when filter is created', async () => {
    const apiTableBody = {
      url: 'https://www.test1.com',
      title: 'test1',
      author: 'test1',
      applicant: 'test1',
      defaultParams: '{}',
    };
    newApiTableInfo = await apiTableServiceInstance.baseCreate(apiTableBody);
    const filterBody = {
      apiTableId: newApiTableInfo.id,
      rangeDate: [{
        title: 'range1',
        startDate: 'start_date1',
        endDate: 'end_date1',
      }, {
        title: 'range2',
        startDate: 'start_date2',
        endDate: 'end_date2',
      }],
      singleDate: [{
        title: 'single1',
        date: 'date1',
      }, {
        title: 'single2',
        date: 'date2',
      }],
      text: [{
        title: 'text1',
        content: 'content1',
      }, {
        title: 'text2',
        content: 'content2',
      }],
      enum: [{
        title: 'enum1',
        list: ['1', '1'],
      }, {
        title: 'enum2',
        list: ['2', '2'],
      }],
    };
    const filterInfo = await filterServiceInstance.transCreate(filterBody);
    expect(filterInfo.success).toBe(true);
    expect(filterInfo.message).toBe('filter created');

    const apiTableInfo = await apiTableDaoInstance.getById(newApiTableInfo.id);
    expect(apiTableInfo.connection.filters).toStrictEqual(filterInfo.id);
  });

  test('TransCreate: should not create a filter when filters of connection is existent', async () => {
    const body = {
      apiTableId: newApiTableInfo.id,
      rangeDate: [{
        title: 'range',
        startDate: 'start_date',
        endDate: 'end_date',
      }],
    };
    const filterInfo = await filterServiceInstance.transCreate(body);
    expect(filterInfo.success).toBe(false);
    expect(filterInfo.error).toBe('Error: Filter is already existent');
  });
});
