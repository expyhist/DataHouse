const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Mock = new mongoose.Schema(
  {
    col1: { type: String, required: true, unique: true },
    col2: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

Mock.plugin(uniqueValidator);

module.exports = Mock;
