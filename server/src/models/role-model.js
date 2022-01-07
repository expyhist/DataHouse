const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Role = new mongoose.Schema(
  {
    name: { type: String, require: true },
  },
  {
    timestamps: true,
  },
);

Role.plugin(uniqueValidator);

module.exports = mongoose.model('roles', Role);