const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Demand = new mongoose.Schema(
  {
    description: { type: String, unique: true, require: true },
    content: { type: String, unique: true, require: true },
    applicant: { type: String, require: true },
    author: { type: String, require: true },
    sql: { type: String },
    status: { type: String, require: true },
    reviewStatus: { type: String, require: true },
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

module.exports = mongoose.model('demands', Demand);
