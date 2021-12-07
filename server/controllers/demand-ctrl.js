const Demand = require('../models/demand-model');

const createDemand = async (req, res) => {
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
      error: 'You must provide a demand',
    });
  }

  if (Object.prototype.hasOwnProperty.call(body, 'content')) {
    try {
      const resp = await Demand.create(body);
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
  } else {
    return res.status(400).json({
      success: false,
      error: 'You must provide a correct json',
    });
  }
};

const updateDemandById = async (req, res) => {
  const isDemandExists = await Demand.exists({ _id: req.params.id });

  if (isDemandExists) {
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
  } else {
    return res.status(400).json({
      success: false,
      error: 'The demand do not existent',
    });
  }
};

const deleteDemandById = async (req, res) => {
  const isDemandExists = await Demand.exists({ _id: req.params.id });

  if (isDemandExists) {
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
  } else {
    return res.status(400).json({
      success: false,
      error: 'The demand do not existent',
    });
  }
};

const getDemandById = async (req, res) => {
  const isDemandExists = await Demand.exists({ _id: req.params.id });

  if (isDemandExists) {
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
  } else {
    return res.status(400).json({
      success: false,
      error: 'The demand do not existent',
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
