const BaseService = require('./BaseService');
const FilterDao = require('../dao/FilterDao');
const ApiTableDao = require('../dao/ApiTableDao');

class FilterService extends BaseService {
  constructor() {
    super(FilterDao);
  }

  transCreate = async (req, res) => {
    const apiTableInfo = await ApiTableDao.getById(req.body.apiTableId);

    if (apiTableInfo.connection.filters) {
      return res.status(400).json({
        success: false,
        error: 'Filter already exist',
      });
    }

    try {
      const resp = await this.instance.add(req.body);
      await ApiTableDao.updateById(req.body.apiTableId, { $set: { 'connection.filters': resp._id } });
      return res.status(201).json({
        success: true,
        id: resp._id,
        message: 'filter created',
      });
    } catch (error) {
      return res.status(422).json({
        success: false,
        error: error.toString(),
      });
    }
  };
}

module.exports = new FilterService();
