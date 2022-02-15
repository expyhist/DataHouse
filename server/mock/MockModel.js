const mongoose = require('mongoose');

const Mock = new mongoose.Schema(
  {
    col1: { type: String, require: true },
    col2: { type: String, require: true },
  },
  {
    timestamps: true,
  },
);

module.exports = Mock;
