const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const ApiTable = new mongoose.Schema(
  {
    url: { type: String, require: true, unique: true },
    title: { type: String, require: true, unique: true },
    author: { type: String, require: true },
    applicant: { type: String, require: true },
    connection: { type: Map, of: mongoose.Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  },
);

ApiTable.plugin(uniqueValidator);

module.exports = mongoose.model('apitables', ApiTable);
