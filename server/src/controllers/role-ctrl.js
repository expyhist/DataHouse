const mongoose = require('mongoose');
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
    const resp = await Role.find({ name: { $in: req.body.name } });
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

const setInitalRoles = async (req, res) => {
  mongoose.connection.db.dropCollection('roles');
  try {
    const menuData = await Menu.find({});
    const parentPaths = menuData.map((item) => item.parentPath);
    const menuDataForAdmin = menuData.filter((item) => {
      const { path, auth } = item;
      return [...new Set(parentPaths)].includes(path) || auth.length !== 0;
    });
    const menuDataForGuest = menuData.filter((item) => {
      const { path, parentPath } = item;
      return !/sysconfig/.test(path) && !/sysconfig/.test(parentPath);
    });

    const adminAuth = [];
    menuDataForAdmin.forEach((item) => {
      const emptyMap = new Map();
      const key = item.path;
      const value = item.auth;
      adminAuth.push(emptyMap.set(key, value));
    });

    const guestAuth = [];
    menuDataForGuest.forEach((item) => {
      const emptyMap = new Map();
      const key = item.path;
      const value = item.auth;
      guestAuth.push(emptyMap.set(key, value));
    });

    const getSomeKeyFromNestObj = (nestObj) => nestObj.map((item) => (({ name, path, auth }) => {
      const title = name;
      const key = path;
      const children = auth;
      return { title, key, children };
    })(item));

    const resp = await Role.insertMany([
      { name: 'admin', auth: adminAuth, originalAuth: getSomeKeyFromNestObj(menuDataForAdmin) },
      { name: 'guest', auth: guestAuth, originalAuth: getSomeKeyFromNestObj(menuDataForGuest) },
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
