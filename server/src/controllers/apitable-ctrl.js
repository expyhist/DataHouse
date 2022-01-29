const ApiTable = require('../models/apitable-model');
const Menu = require('../models/menu-model');
const parseTimeToLocale = require('../utils/parseTimeToLocale');

const createApiTable = async (req, res) => {
  const body = { ...req.body, ...{ connection: new Map() } };

  try {
    const resp = await ApiTable.create(body);
    return res.status(201).json({
      success: true,
      id: resp._id,
      title: resp.title,
      message: 'apitable created',
    });
  } catch (error) {
    return res.status(422).json({
      success: false,
      error: error.toString(),
    });
  }
};

const updateApiTableById = async (req, res) => {
  try {
    const resp = await ApiTable.findByIdAndUpdate(req.params.id, req.body);
    const apiTableInfo = await ApiTable.findById(req.params.id);
    const menuId = apiTableInfo.connection.get('menus');
    await Menu.findByIdAndUpdate(menuId, { name: req.body.title });
    return res.status(201).json({
      success: true,
      id: resp._id,
      message: 'apitable updated',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.toString(),
    });
  }
};

const deleteApiTableById = async (req, res) => {
  try {
    const resp = await ApiTable.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      id: resp._id,
      message: 'apitable deleted',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.toString(),
    });
  }
};

const getApiTableById = async (req, res) => {
  try {
    const resp = await ApiTable.findById(req.params.id).lean();
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

const getAllApiTables = async (req, res) => {
  try {
    const resp = await ApiTable.find({}).lean();
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

module.exports = {
  createApiTable,
  updateApiTableById,
  deleteApiTableById,
  getApiTableById,
  getAllApiTables,
};
