const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Demand = new mongoose.Schema(
  {
    description: { type: String, unique: true, required: true },
    cols: { type: String, unique: true, required: true },
    applicant: { type: String, required: true },
    executor: { type: String, required: true },
    expectedTime: { type: String, required: true },
    isUrgency: { type: Number, enum: [0, 1] },
    sql: { type: String },
    status: { type: String, required: true },
    reviewStatus: { type: String, required: true },
    tag: [
      { type: String },
    ],
    addition: [
      { type: mongoose.Schema.Types.ObjectId },
    ],
  },
  {
    timestamps: true,
  },
);

Demand.plugin(uniqueValidator);

module.exports = Demand;
