const mongoose = require('mongoose');
const User = require('../models/user-model');
const Role = require('../models/role-model');
const Menu = require('../models/menu-model');
const parseTimeToLocale = require('../utils/parseTimeToLocale');

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
    const resp = await Role.findById(req.params.id).lean();
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

const getAllRoles = async (req, res) => {
  try {
    const resp = await Role.find({}).lean();
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

const getAuthsById = async (req, res) => {

  let resp;

  if (req.body.rolesId) {
    resp = await Role.findById(req.body.rolesId).lean();
  } else {
    const userInfo = await User.findById(req.userId).lean();
    resp = await Role.find({ name: { $in: userInfo.rolesName } }).lean();
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
    const auths = Array.isArray(resp) ? resp.map((item) => item.auth): resp.auth;

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

const setInitalRoles = async (req, res) => {
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
    const menuData = await Menu.find({});
    const adminAuth = [];
    const guestAuth = [];

    const filterFnForGuest = (item) => {
      const { path, parentPath } = item;
      return !/sysconfig|\/tables\/configs\/list/.test(path) && !/sysconfig/.test(parentPath);
    };
    setDataForRole(menuData, adminAuth);
    setDataForRole(menuData, guestAuth, filterFnForGuest);

    const resp = await Role.insertMany([
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

module.exports = {
  createRole,
  updateRoleById,
  deleteRoleById,
  getRoleById,
  getAllRoles,
  getAuthsById,
  setInitalRoles,
};
