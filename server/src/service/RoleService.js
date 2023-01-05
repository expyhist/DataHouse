const { Base64 } = require('js-base64');

const BaseService = require('./BaseService');
const RoleDao = require('../dao/RoleDao');
const UserDao = require('../dao/UserDao');
const MenuDao = require('../dao/MenuDao');

const objToArray = require('../utils/objToArray');
const filterTreeData = require('../utils/filterTreeData');
const treeToList = require('../utils/treeToList');

class RoleService extends BaseService {
  constructor(daoInstance) {
    super(daoInstance || new RoleDao());
    this.UserDaoInstance = new UserDao(daoInstance?.connection);
    this.MenuDaoInstance = new MenuDao(daoInstance?.connection);
  }

  transCreate = async (body) => {
    const { name, menusTree, auth } = body;
    const keepCondition = (item) => auth.includes(item.key);

    try {
      const filterAuth = filterTreeData(menusTree, keepCondition);
      const resp = await this.dao.add({ name, auth: treeToList(filterAuth) });
      return {
        success: true,
        id: resp._id,
        message: `${this.dao.getModalName()} created`,
      };
    } catch (error) {
      throw {
        success: false,
        msg: error.toString(),
      };
    }
  };

  transUpdateById = async (id, body) => {
    const { name, menusTree, auth } = body;
    const keepCondition = (item) => auth.includes(item.key);

    try {
      const filterAuth = filterTreeData(menusTree, keepCondition);
      const resp = await this.dao.updateById(id, { name, auth: treeToList(filterAuth) });
      return {
        success: true,
        id: resp._id,
        message: `${this.dao.getModalName()} updated`,
      };
    } catch (error) {
      throw {
        success: false,
        msg: error.toString(),
      };
    }
  };

  getAuths = async (userId, encodeBody) => {
    const body = JSON.parse(Base64.decode(encodeBody));

    let resp;

    if (body.rolesName) {
      resp = await this.dao.get({ name: body.rolesName });
    } else {
      const userInfo = await this.UserDaoInstance.getById(userId);
      resp = await this.dao.get({ name: { $in: userInfo.rolesName } });
    }

    try {
      let result;

      if (resp.length === 1) {
        result = objToArray(resp[0].auth);
      } else {
        for (let i = 0; i < resp.length; i += 1) {
          result = { ...result, ...objToArray(resp[i].auth) };
        }
      }

      return {
        success: true,
        data: result || {},
      };
    } catch (error) {
      throw {
        success: false,
        msg: error.toString(),
      };
    }
  };

  setInitialRoles = async () => {
    const setDataForRole = (menuData, auths, filterFn) => {
      const filteredMenuData = filterFn ? menuData.filter(filterFn) : menuData;
      filteredMenuData.forEach((item) => {
        const emptyMap = new Map();
        const key = item.path;
        const value = item.auth;
        auths.push(emptyMap.set(key, value));
      });
    };

    try {
      const menuData = await this.MenuDaoInstance.getAll();
      const adminAuth = [];
      const guestAuth = [];

      const filterFnForGuest = (item) => {
        const { path, parentPath } = item;
        return !/sysconfig|\/tables\/configs\/list/.test(path) && !/sysconfig/.test(parentPath);
      };
      setDataForRole(menuData, adminAuth);
      setDataForRole(menuData, guestAuth, filterFnForGuest);

      const resp = await this.dao.insertMany([
        { name: 'admin', auth: adminAuth },
        { name: 'guest', auth: guestAuth },
      ]);

      return {
        success: true,
        data: resp,
      };
    } catch (error) {
      throw {
        success: false,
        msg: error.toString(),
      };
    }
  };
}

module.exports = RoleService;
