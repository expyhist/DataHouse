const Filter = require('../models/filter-model');
const ApiTable = require('../models/apitable-model');

const createFilter = async (req, res) => {
  const r = await ApiTable.findById(req.body.apiTableId);

  if (r?.connection.get('filters')) {
    return res.status(400).json({
      success: false,
      error: 'Filter already exist',
    });
  }

  try {
    const resp = await Filter.create(req.body);
    const apiTableData = await ApiTable.findById(req.body.apiTableId);
    await apiTableData.connection.set('filters', resp._id);
    await apiTableData.save();
    return res.status(201).json({
      success: true,
      id: resp._id,
      message: 'filter created',
    });
  } catch (error) {
    return res.status(422).json({
      success: false,
      error: error.toString(),
    });
  }
};

const updateFilterById = async (req, res) => {
  try {
    const resp = await Filter.findByIdAndUpdate(req.params.id, req.body);
    return res.status(201).json({
      success: true,
      id: resp._id,
      message: 'filter updated',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.toString(),
    });
  }
};

const deleteFilterById = async (req, res) => {
  try {
    const resp = await Filter.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      id: resp._id,
      message: 'filter deleted',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.toString(),
    });
  }
};

const getFilterById = async (req, res) => {
  try {
    const resp = await Filter.findById(req.params.id);
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

const getAllFilters = async (req, res) => {
  try {
    const resp = await Filter.find({});
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
  createFilter,
  updateFilterById,
  deleteFilterById,
  getFilterById,
  getAllFilters,
};
