const Demand = require('../models/demand-model');

const createDemand = async (req, res) => {
  try {
    const resp = await Demand.create(req.body);
    return res.status(201).json({
      success: true,
      id: resp._id,
      message: 'demand created',
    });
  } catch (error) {
    return res.status(422).json({
      success: false,
      error: error.toString(),
    });
  }
};

const updateDemandById = async (req, res) => {
  try {
    const resp = await Demand.findByIdAndUpdate(req.params.id, req.body);
    return res.status(201).json({
      success: true,
      id: resp._id,
      message: 'demand updated',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.toString(),
    });
  }
};

const deleteDemandById = async (req, res) => {
  try {
    const resp = await Demand.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      id: resp._id,
      message: 'demand deleted',
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.toString(),
    });
  }
};

const getDemandById = async (req, res) => {
  try {
    const resp = await Demand.findById(req.params.id);
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

const getAllDemands = async (req, res) => {
  try {
    const resp = await Demand.find({});
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
  createDemand,
  updateDemandById,
  deleteDemandById,
  getDemandById,
  getAllDemands,
};
