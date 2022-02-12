const BaseService = require('./BaseService');
const ApiTableDao = require('../dao/ApiTableDao');
const MenuDao = require('../dao/MenuDao');
const FilterDao = require('../dao/FilterDao');

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
      const { _id, title } = apiTableInfo;
      const menuPayload = {
        parentPath: '/tables/databoard/:id',
        path: `/tables/databoard/${_id}`,
        name: title,
        icon: '',
        auth: [`${title}-ExportTable`, `${title}-GetTableData`],
      };
      const menuInfo = await MenuDao.add(menuPayload);
      await this.instance.updateById(_id, { $set: { 'connection.menus': menuInfo._id } });

      return res.status(201).json({
        success: true,
        id: _id,
        title,
        message: `${this.instance.getModalName()} created`,
      });
    } catch (error) {
      return res.status(422).json({
        success: false,
        error: error.toString(),
      });
    }
  };

  transUpdate = async (req, res) => {
    try {
      const apiTableInfo = await this.instance.updateById(req.params.id, req.body);
      const { title, connection } = apiTableInfo;
      const menuInfo = await MenuDao.getById(connection.get('menus'));
      if (title !== menuInfo.name) {
        await MenuDao.updateById(connection.get('menus'), { ...menuInfo, ...{ name: title } });
      }

      return res.status(201).json({
        success: true,
        message: `${this.instance.getModalName()} updated`,
      });
    } catch (error) {
      return res.status(422).json({
        success: false,
        error: error.toString(),
      });
    }
  };

  transDelete = async (req, res) => {
    try {
      let info;
      const apiTableInfo = await this.instance.deleteById(req.params.id);
      const { connection } = apiTableInfo;
      if (apiTableInfo) {
        info = '配置';
      }
      if (connection.get('menus')) {
        await MenuDao.deleteById(connection.get('menus'));
        info += ',菜单';
      }
      if (connection.get('filters')) {
        await FilterDao.deleteById(connection.get('filters'));
        info += ',筛选条件';
      }
      return res.status(201).json({
        success: true,
        info,
        message: `${this.instance.getModalName()} delete`,
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
