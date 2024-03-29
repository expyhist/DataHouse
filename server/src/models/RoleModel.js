const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Role = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    auth: [
      { type: Map, of: Array },
    ],
  },
  {
    timestamps: true,
  },
);

Role.plugin(uniqueValidator);

module.exports = Role;
