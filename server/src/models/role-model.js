const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Role = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    auth: [
      { type: Map, of: Array },
    ],
    originalAuth: [{
      title: { type: String },
      key: { type: String },
      children: { type: Array },
    }],
  },
  {
    timestamps: true,
  },
);

Role.plugin(uniqueValidator);

module.exports = mongoose.model('roles', Role);
