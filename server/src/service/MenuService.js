const mongoose = require('mongoose');
const { Base64 } = require('js-base64');

const BaseService = require('./BaseService');
const MenuDao = require('../dao/MenuDao');
const { initalMenus } = require('../config/db-config');

class MenuService extends BaseService {
  constructor(daoInstance) {
    super(daoInstance || new MenuDao());
  }

  getMenusByTree = async () => {
    try {
      const resp = await this.dao.getAll();
      const listToTree = (items, path = '', link = 'parentPath') => items
        .filter((item) => item[link] === path)
        .map((item) => ({ ...item, children: listToTree(items, item.path) }));

      const auths = [];
      resp.forEach((item) => {
        const { auth, path } = item;
        return auth.forEach((ele) => auths.push({ path: ele, name: ele, parentPath: path }));
      });

      const menuData = [...resp, ...auths].map((item) => {
        const { path, name, parentPath } = item;
        const key = path;
        const value = path;
        const title = name;
        return {
          key, title, parentPath, value, path,
        };
      });

      return {
        success: true,
        data: listToTree(menuData),
      };
    } catch (error) {
      return {
        success: false,
        error: error.toString(),
      };
    }
  };

  getMenusByAccess = async (encodeAccess) => {
    try {
      const access = Base64.decode(encodeAccess);
      const resp = await this.dao.get({ path: { $in: access.split(',') } });

      const listToTree = (items, path = '', link = 'parentPath') => items
        .filter((item) => item[link] === path)
        .map((item) => ({ ...item, children: listToTree(items, item.path) }));

      return {
        success: true,
        data: listToTree(resp),
      };
    } catch (error) {
      return {
        success: false,
        error: error.toString(),
      };
    }
  };

  setInitalMenus = async () => {
    mongoose.connection.db.dropCollection('menus');
    try {
      const resp = await this.dao.insertMany(initalMenus);
      return {
        success: true,
        data: resp,
      };
    } catch (error) {
      return {
        success: false,
        error: error.toString(),
      };
    }
  };
}

module.exports = MenuService;
