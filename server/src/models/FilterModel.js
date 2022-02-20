const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Filter = new mongoose.Schema(
  {
    rangeDate: [{
      title: { type: String },
      startDate: { type: String },
      endDate: { type: String },
    }],
    singleDate: [{
      title: { type: String },
      date: { type: String },
    }],
    text: [{
      title: { type: String },
      content: { type: String },
    }],
    enum: [{
      title: { type: String },
      list: [{ type: String }],
    }],
  },
  {
    timestamps: true,
  },
);

Filter.plugin(uniqueValidator);

module.exports = Filter;
