const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { produce } = require('immer');

const BaseService = require('./BaseService');
const ApiTableDao = require('../dao/ApiTableDao');
const MenuDao = require('../dao/MenuDao');
const FilterDao = require('../dao/FilterDao');

const getDataWithUUID = (data) => {
  const result = produce(data, (draft) => {
    draft.map((obj) => {
      const newObj = obj;
      const uuid = Object.prototype.hasOwnProperty.call(obj, 'uuid') ? obj.uuid : uuidv4();
      newObj.uuid = uuid;
      return newObj;
    });
  });
  return result;
};

class ApiTableService extends BaseService {
  constructor(daoInstance) {
    super(daoInstance || new ApiTableDao());
    this.MenuDaoInstance = new MenuDao(daoInstance?.connection);
    this.FilterDaoInstance = new FilterDao(daoInstance?.connection);
  }

  transCreate = async (body) => {
    try {
      let info;
      const apiTableInfo = await this.dao.add({ ...body, ...{ connection: new Map() } });
      const { _id, title } = apiTableInfo;
      info = '配置';
      const menuPayload = {
        parentPath: '/tables/databoard/:id',
        path: `/tables/databoard/${_id}`,
        name: title,
        icon: '',
        auth: [`${title}-ExportTable`, `${title}-GetTableData`],
      };
      const menuInfo = await this.MenuDaoInstance.add(menuPayload);
      await this.dao.updateById(_id, { $set: { 'connection.menus': menuInfo._id } });
      info += ',菜单';

      return {
        success: true,
        id: _id,
        title,
        info,
        message: `${this.dao.getModalName()} created`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.toString(),
      };
    }
  };

  transUpdate = async (id, body) => {
    try {
      const apiTableInfo = await this.dao.updateById(id, body);
      const { title, connection } = apiTableInfo;
      const menuInfo = await this.MenuDaoInstance.getById(connection.get('menus'));
      if (title !== menuInfo.name) {
        await this.MenuDaoInstance.updateById(connection.get('menus'), { ...menuInfo, ...{ name: title } });
      }

      return {
        success: true,
        message: `${this.dao.getModalName()} updated`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.toString(),
      };
    }
  };

  transDelete = async (id) => {
    try {
      let info;
      const apiTableInfo = await this.dao.deleteById(id);
      const { connection } = apiTableInfo;
      info = '配置';
      if (connection.get('menus')) {
        await this.MenuDaoInstance.deleteById(connection.get('menus'));
        info += ',菜单';
      }
      if (connection.get('filters')) {
        await this.FilterDaoInstance.deleteById(connection.get('filters'));
        info += ',筛选条件';
      }
      return {
        success: true,
        info,
        message: `${this.dao.getModalName()} delete`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.toString(),
      };
    }
  };

  getApiTableData = async (id, body) => {
    try {
      const apiUrl = await this.dao.getById(id);

      let baseUrl;
      let tableData;
      let result;

      if (!/appCode/.test(apiUrl)) {
        baseUrl = apiUrl.url;
        tableData = await axios.get(baseUrl);
        result = getDataWithUUID(tableData.data);
      } else {
        [baseUrl] = apiUrl.url.match(/(.*)(?=\?)/g);
        tableData = await axios.get(baseUrl, { params: body });
        const { totalNum, rows } = tableData.data.data;
        if (totalNum) {
          result = getDataWithUUID(rows);
        }
        result = [];
      }

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error.toString(),
      };
    }
  };
}

module.exports = ApiTableService;
