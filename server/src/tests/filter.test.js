const FilterDao = require('../dao/FilterDao');
const FilterService = require('../service/FilterService');
const ApiTableDao = require('../dao/ApiTableDao');
const ApiTableService = require('../service/ApiTableService');
const MenuDao = require('../dao/MenuDao');

module.exports = (testConnection) => {
  describe('test filter', () => {
    let newApiTableInfo;
    const filterDaoInstance = new FilterDao(testConnection);
    const apiTableDaoInstance = new ApiTableDao(testConnection);
    const filterServiceInstance = new FilterService(filterDaoInstance);
    const apiTableServiceInstance = new ApiTableService(apiTableDaoInstance);
    const menuDaoInstance = new MenuDao(testConnection);

    beforeAll(async () => {
      const body = {
        url: 'https://www.test.com',
        title: 'test',
        author: 'test',
        applicant: 'test',
        defaultParams: '{}',
      };
      newApiTableInfo = await apiTableServiceInstance.transCreate(body);
    });

    afterAll(async () => {
      await apiTableDaoInstance.deleteMany({});
      await filterDaoInstance.deleteMany({});
      await menuDaoInstance.deleteMany({});
    });

    test('TransCreate: should not create a filter when apiTableId of body is not existent', async () => {
      const body = {
        rangeDate: [{
          title: 'test',
          startDate: 'start_date',
          endDate: 'end_date',
        }],
      };
      try {
        await filterServiceInstance.transCreate(body);
      } catch (error) {
        expect(error.success).toBe(false);
        expect(error.msg).toBe('Error: apiTableId is not existent');
      }
    });

    test('TransCreate: should create a filters of apitable when a filter is created', async () => {
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
      expect(apiTableInfo.filters).toStrictEqual(filterInfo.id);
    });

    test('TransCreate: should not create a filter when filters of apitable is existent', async () => {
      const body = {
        apiTableId: newApiTableInfo.id,
        rangeDate: [{
          title: 'range',
          startDate: 'start_date',
          endDate: 'end_date',
        }],
      };
      try {
        await filterServiceInstance.transCreate(body);
      } catch (error) {
        expect(error.success).toBe(false);
        expect(error.msg).toBe('Error: Filter is already existent');
      }
    });
  });
};
