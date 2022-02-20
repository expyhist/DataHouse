const BaseService = require('./BaseService');
const FilterDao = require('../dao/FilterDao');
const ApiTableDao = require('../dao/ApiTableDao');

class FilterService extends BaseService {
  constructor(daoInstance) {
    super(daoInstance || new FilterDao());
    this.ApiTableDaoInstance = new ApiTableDao(daoInstance?.connection);
  }

  transCreate = async (body) => {
    try {
      if (!body?.apiTableId) {
        throw new Error('apiTableId is not existent');
      }
      const apiTableInfo = await this.ApiTableDaoInstance.getById(body.apiTableId);

      if (apiTableInfo.connection?.filters) {
        throw new Error('Filter is already existent');
      }

      const resp = await this.dao.add(body);
      await this.ApiTableDaoInstance.updateById(body.apiTableId, { $set: { 'connection.filters': resp._id } });
      return {
        success: true,
        id: resp._id,
        message: `${this.dao.getModalName()} created`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.toString(),
      };
    }
  };
}

module.exports = FilterService;
