const mongoose = require('mongoose');
const BaseService = require('./BaseService');
const MenuDao = require('../dao/MenuDao');
const { initalMenus } = require('../config/db-config');

class MenuService extends BaseService {
  constructor() {
    super(MenuDao);
  }

  getMenusByTree = async (req, res) => {
    try {
      const resp = await this.instance.getAll();
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

      return res.status(200).json({
        success: true,
        data: listToTree(menuData),
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: error.toString(),
      });
    }
  };

  getMenusByAccess = async (req, res) => {
    try {
      const resp = await this.instance.get({ path: { $in: req.body.path } });

      const listToTree = (items, path = '', link = 'parentPath') => items
        .filter((item) => item[link] === path)
        .map((item) => ({ ...item, children: listToTree(items, item.path) }));

      return res.status(200).json({
        success: true,
        data: listToTree(resp),
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        error: error.toString(),
      });
    }
  };

  setInitalMenus = async (req, res) => {
    mongoose.connection.db.dropCollection('menus');
    try {
      const resp = await this.instance.insertMany(initalMenus);
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

module.exports = new MenuService();
