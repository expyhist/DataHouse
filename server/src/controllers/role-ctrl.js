const Role = require('../models/role-model');

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

module.exports = {
  createRole,
  updateRoleById,
  deleteRoleById,
  getRoleById,
  getAllRoles,
};
