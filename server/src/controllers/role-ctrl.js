const mongoose = require('mongoose');
const User = require('../models/user-model');
const Role = require('../models/role-model');
const Menu = require('../models/menu-model');

const createRole = async (req, res) => {
  try {
    const resp = await Role.create(req.body);
    return res.status(201).json({
      success: true,
      id: resp._id,
      message: 'role created',
    });
  } catch (error) {
    return res.status(422).json({
      success: false,
      error: error.toString(),
    });
  }
};

const updateRoleById = async (req, res) => {
  try {
    const resp = await Role.findByIdAndUpdate(req.params.id, req.body);
    return res.status(201).json({
      success: true,
      id: resp._id,
      message: 'role updated',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.toString(),
    });
  }
};

const deleteRoleById = async (req, res) => {
  try {
    const resp = await Role.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      id: resp._id,
      message: 'role deleted',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.toString(),
    });
  }
};

const getRoleById = async (req, res) => {
  try {
    const resp = await Role.findById(req.params.id);
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

const getAllRoles = async (req, res) => {
  try {
    const resp = await Role.find({});
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

const getRoleByName = async (req, res) => {
  try {
    const userInfo = await User.findById(req.userId);
    const resp = await Role.find({ name: { $in: userInfo.rolesName } });
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

const setDataForRole = (menuData, auths, filterFn) => {
  const filteredMenuData = filterFn ? menuData.filter(filterFn) : menuData;
  filteredMenuData.forEach((item) => {
    const emptyMap = new Map();
    const key = item.path;
    const value = item.auth;
    auths.push(emptyMap.set(key, value));
  });

  return filteredMenuData;
};

const getSomeKeyFromNestObj = (nestObj) => nestObj.map((item) => (({ name, path, auth }) => {
  const title = name;
  const key = path;
  const children = auth;
  return { title, key, children };
})(item));

const setInitalRoles = async (req, res) => {
  mongoose.connection.db.dropCollection('roles');

  try {
    const menuData = await Menu.find({});
    const adminAuth = [];
    const guestAuth = [];

    const menuDataForAdmin = setDataForRole(menuData, adminAuth);
    const filterFnForGuest = (item) => {
      const { path, parentPath } = item;
      return !/sysconfig|\/tables\/configs\/list/.test(path) && !/sysconfig/.test(parentPath);
    };
    const menuDataForGuest = setDataForRole(menuData, guestAuth, filterFnForGuest);

    const resp = await Role.insertMany([
      { name: 'admin', originalAuth: getSomeKeyFromNestObj(menuDataForAdmin), auth: adminAuth },
      { name: 'guest', originalAuth: getSomeKeyFromNestObj(menuDataForGuest), auth: guestAuth },
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

module.exports = {
  createRole,
  updateRoleById,
  deleteRoleById,
  getRoleById,
  getAllRoles,
  getRoleByName,
  setInitalRoles,
};
