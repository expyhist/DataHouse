const Menu = require('../models/menu-model');
const ApiTable = require('../models/apitable-model');

const createMenu = async (req, res) => {
  const { body } = req;
  const contentType = req.headers['content-type'];

  if (!contentType.includes('application/json')) {
    return res.status(406).json({
      success: false,
      error: 'Your content-type must be correct',
    });
  }

  if (Object.keys(body).length === 0) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a menu',
    });
  }

  if (Object.prototype.hasOwnProperty.call(body, 'name')) {
    try {
      const resp = await Menu.create(body);
      const apiTableData = await ApiTable.findById(body.apiTableId);
      await apiTableData.connection.set('menus', resp._id);
      await apiTableData.save();
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
  } else {
    return res.status(400).json({
      success: false,
      error: 'You must provide a correct json',
    });
  }
};

const updateMenuById = async (req, res) => {
  const isMenuExists = await Menu.exists({ _id: req.params.id });

  if (isMenuExists) {
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
  } else {
    return res.status(400).json({
      success: false,
      error: 'The menu do not existent',
    });
  }
};

const deleteMenuById = async (req, res) => {
  const isMenuExists = await Menu.exists({ _id: req.params.id });

  if (isMenuExists) {
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
  } else {
    return res.status(400).json({
      success: false,
      error: 'The menu do not existent',
    });
  }
};

const getMenuById = async (req, res) => {
  const isMenuExists = await Menu.exists(req.params.id);

  if (isMenuExists) {
    try {
      const resp = await Menu.findById(req.params.id);
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
  } else {
    return res.status(400).json({
      success: false,
      error: 'The menu do not existent',
    });
  }
};

const getAllMenus = async (req, res) => {
  try {
    const resp = await Menu.find({}).lean();

    if (req.params.type === 'menusTree') {
      const listToTree = (items, key = '', link = 'parentPath') => items
        .filter((item) => item[link] === key)
        .map((item) => ({ ...item, children: listToTree(items, item.key) }));

      const menuData = resp.map((data) => {
        const { path: key, name: title, parentPath } = { ...data };
        return { key, title, parentPath };
      });

      return res.status(200).json({
        success: true,
        data: listToTree(menuData),
      });
    }

    if (req.params.type === 'siderMenus') {
      const listToTree = (items, path = '', link = 'parentPath') => items
        .filter((item) => item[link] === path)
        .map((item) => ({ ...item, children: listToTree(items, item.path) }));

      return res.status(200).json({
        success: true,
        data: listToTree(resp),
      });
    }

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
};
