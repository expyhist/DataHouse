const mongoose = require('mongoose');
const Menu = require('../models/menu-model');
const ApiTable = require('../models/apitable-model');
const { initalMenus } = require('../config/db-config');
const parseTimeToLocale = require('../utils/parseTimeToLocale');

const createMenu = async (req, res) => {
  try {
    const resp = await Menu.create(req.body);
    if (req.body.apiTableId) {
      const apiTableData = await ApiTable.findById(req.body.apiTableId);
      apiTableData.connection.set('menus', resp._id);
      apiTableData.save();
    }
    return res.status(201).json({
      success: true,
      id: resp._id,
      message: 'menu created',
    });
  } catch (error) {
    return res.status(422).json({
      success: false,
      error: error.toString(),
    });
  }
};

const updateMenuById = async (req, res) => {
  try {
    const resp = await Menu.findByIdAndUpdate(req.params.id, req.body);
    return res.status(201).json({
      success: true,
      id: resp._id,
      message: 'menu updated',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.toString(),
    });
  }
};

const deleteMenuById = async (req, res) => {
  try {
    const resp = await Menu.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      id: resp._id,
      message: 'menu deleted',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.toString(),
    });
  }
};

const getMenuById = async (req, res) => {
  try {
    const resp = await Menu.findById(req.params.id).lean();
    return res.status(200).json({
      success: true,
      data: parseTimeToLocale(resp, ['createdAt', 'updatedAt']),
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.toString(),
    });
  }
};

const getAllMenus = async (req, res) => {
  try {
    const resp = await Menu.find({}).lean();

    if (req.params.type === 'normal') {
      return res.status(200).json({
        success: true,
        data: parseTimeToLocale(resp, ['createdAt', 'updatedAt']),
      });
    }

    if (req.params.type === 'menusTree') {
      const listToTree = (items, key = '', link = 'parentPath') => items
        .filter((item) => item[link] === key)
        .map((item) => ({ ...item, children: listToTree(items, item.key) }));

      const auths = [];
      resp
        .filter((item) => Array.isArray(item.auth) && item.auth.length > 0)
        .forEach((item) => {
          const { auth, path } = item;
          return auth.forEach((ele) => auths.push({ path: ele, name: ele, parentPath: path }));
        });

      const menuData = [...resp, ...auths].map((item) => {
        const { path: key, name: title, parentPath } = { ...item };
        return { key, title, parentPath };
      });

      return res.status(200).json({
        success: true,
        data: listToTree(menuData),
      });
    }

    return res.status(200).json({
      success: true,
      data: [],
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.toString(),
    });
  }
};

const getMenusByAccess = async (req, res) => {
  try {
    const resp = await Menu.find({ path: { $in: req.body.path } }).lean();

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

const setInitalMenus = async (req, res) => {
  mongoose.connection.db.dropCollection('menus');
  try {
    const resp = await Menu.insertMany(initalMenus);
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

module.exports = {
  createMenu,
  updateMenuById,
  deleteMenuById,
  getMenuById,
  getAllMenus,
  getMenusByAccess,
  setInitalMenus,
};
