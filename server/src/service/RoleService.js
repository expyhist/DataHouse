const mongoose = require('mongoose');
const BaseService = require('./BaseService');
const RoleDao = require('../dao/RoleDao');
const UserDao = require('../dao/UserDao');
const MenuDao = require('../dao/MenuDao');

class RoleService extends BaseService {
  constructor() {
    super(RoleDao);
  }

  getAuthsById = async (req, res) => {
    let resp;

    if (req.body.rolesId) {
      resp = await this.instance.getById(req.body.rolesId);
    } else {
      const userInfo = await UserDao.getById(req.userId);
      resp = await this.instance.get({ name: { $in: userInfo.rolesName } });
    }

    const pushObjToArray = (obj, arr) => {
      Object.entries(obj).forEach(([key, value]) => {
        if (Array.isArray(key)) {
          arr.push(...key);
        } else arr.push(key);
        if (Array.isArray(value)) {
          arr.push(...value);
        } else arr.push(value);
      });
      return arr;
    };

    try {
      const result = {};
      const auths = Array.isArray(resp) ? resp.map((item) => item.auth) : resp.auth;

      auths
        .reduce((acc, cur) => {
          const arr = [];
          if (Array.isArray(cur)) {
            cur.forEach((item) => pushObjToArray(item, arr));
          } else {
            pushObjToArray(cur, arr);
          }
          return acc.concat(arr);
        }, [])
        .forEach((item) => {
          result[item] = true;
          return null;
        });

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: error.toString(),
      });
    }
  };

  // const getSomeKeyFromNestObj = (nestObj) => nestObj.map((item) => (({ name, path, auth }) => {
  //   const title = name;
  //   const key = path;
  //   const children = auth;
  //   return { title, key, children };
  // })(item));

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
