const mongoose = require('mongoose');
const BaseService = require('./BaseService');
const RoleDao = require('../dao/RoleDao');
const UserDao = require('../dao/UserDao');
const MenuDao = require('../dao/MenuDao');
const objToArray = require('../utils/objToArray');
const filterTreeData = require('../utils/filterTreeData');
const treeToList = require('../utils/treeToList');

class RoleService extends BaseService {
  constructor() {
    super(RoleDao);
  }

  baseUpdateById = async (req, res) => {
    const { menusTree, auth } = req.body;

    const keepCondition = (item) => auth.includes(item.key);

    try {
      const filterAuth = filterTreeData(menusTree, keepCondition);
      const resp = await this.instance.updateById(req.params.id, { auth: treeToList(filterAuth) });
      return res.status(200).json({
        success: true,
        id: resp._id,
        message: `${this.instance.getModalName()} updated`,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: error.toString(),
      });
    }
  };

  getAuths = async (req, res) => {
    let resp;

    if (req.body.roleName) {
      resp = await this.instance.get({ name: req.body.roleName });
    } else {
      const userInfo = await UserDao.getById(req.userId);
      resp = await this.instance.get({ name: { $in: userInfo.rolesName } });
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

      return res.status(200).json({
        success: true,
        data: result || {},
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: error.toString(),
      });
    }
  };

  setInitalRoles = async (req, res) => {
    mongoose.connection.db.dropCollection('roles');

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
      const menuData = await MenuDao.getAll();
      const adminAuth = [];
      const guestAuth = [];

      const filterFnForGuest = (item) => {
        const { path, parentPath } = item;
        return !/sysconfig|\/tables\/configs\/list/.test(path) && !/sysconfig/.test(parentPath);
      };
      setDataForRole(menuData, adminAuth);
      setDataForRole(menuData, guestAuth, filterFnForGuest);

      const resp = await this.instance.insertMany([
        { name: 'admin', auth: adminAuth },
        { name: 'guest', auth: guestAuth },
      ]);

      return res.status(200).json({
        success: true,
        data: resp,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: error.toString(),
      });
    }
  };
}

module.exports = new RoleService();
