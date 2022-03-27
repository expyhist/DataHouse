const mongoose = require('mongoose');

const Mock = new mongoose.Schema(
  {
    col1: { type: String, required: true },
    col2: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = Mock;
