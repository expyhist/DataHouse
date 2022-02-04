const BaseService = require('./BaseService');
const ApiTableDao = require('../dao/ApiTableDao');
const MenuDao = require('../dao/MenuDao');

class ApiTableService extends BaseService {
  constructor() {
    super(ApiTableDao);
  }

  baseCreate = async (req, res) => {
    try {
      const resp = await this.instance.add({ ...req.body, ...{ connection: new Map() } });
      return res.status(201).json({
        success: true,
        id: resp._id,
        title: resp.title,
        message: `${this.instance.getModalName()} created`,
      });
    } catch (error) {
      return res.status(422).json({
        success: false,
        error: error.toString(),
      });
    }
  };

  transCreate = async (req, res) => {
    try {
      const apiTableInfo = await this.instance.add({ ...req.body, ...{ connection: new Map() } });
      const menuPayload = {
        parentPath: '/tables/databoard/:id',
        path: `/tables/databoard/${apiTableInfo._id}`,
        name: apiTableInfo.title,
        icon: '',
        auth: ['ExportTable', 'GetTableData'],
      };
      const menuInfo = await MenuDao.add(menuPayload);
      await this.instance.updateById(apiTableInfo._id, { connection: { menus: menuInfo._id } });

      return res.status(201).json({
        success: true,
        id: apiTableInfo._id,
        title: apiTableInfo.title,
        message: `${this.instance.getModalName()} created`,
      });
    } catch (error) {
      return res.status(422).json({
        success: false,
        error: error.toString(),
      });
    }
  };
}

module.exports = new ApiTableService();
