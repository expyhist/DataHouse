const ApiTable = require('../models/apitable-model');
const Menu = require('../models/menu-model');

const createApiTable = async (req, res) => {
  const body = { ...req.body, ...{ connection: new Map() } };
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
      error: 'You must provide a apitable',
    });
  }

  if (Object.prototype.hasOwnProperty.call(body, 'url')) {
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
  } else {
    return res.status(400).json({
      success: false,
      error: 'You must provide a correct json',
    });
  }
};

const updateApiTableById = async (req, res) => {
  const isApiTableExists = await ApiTable.exists({ _id: req.params.id });

  if (isApiTableExists) {
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
  } else {
    return res.status(400).json({
      success: false,
      error: 'The apitable do not existent',
    });
  }
};

const deleteApiTableById = async (req, res) => {
  const isApiTableExists = await ApiTable.exists({ _id: req.params.id });

  if (isApiTableExists) {
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
  } else {
    return res.status(400).json({
      success: false,
      error: 'The apitable do not existent',
    });
  }
};

const getApiTableById = async (req, res) => {
  const isApiTableExists = await ApiTable.exists({ _id: req.params.id });

  if (isApiTableExists) {
    try {
      const resp = await ApiTable.findById(req.params.id);
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
      error: 'The apitable do not existent',
    });
  }
};

const getAllApiTables = async (req, res) => {
  try {
    const resp = await ApiTable.find({});
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
  createApiTable,
  updateApiTableById,
  deleteApiTableById,
  getApiTableById,
  getAllApiTables,
};
