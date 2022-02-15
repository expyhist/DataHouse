const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const rules = require('../utils/rules');

const ApiTable = new mongoose.Schema(
  {
    url: {
      type: String,
      require: true,
      unique: true,
      validate: {
        validator: rules.url,
        message: (props) => `${props.value} is not a valid url!`,
      },
    },
    title: { type: String, require: true, unique: true },
    author: { type: String, require: true },
    applicant: { type: String, require: true },
    connection: { type: Map, of: mongoose.Schema.Types.ObjectId },
    defaultParams: {
      type: mongoose.Schema.Types.Mixed,
      validate: {
        validator: rules.json,
        message: (props) => `${props.value} is not a valid json!`,
      },
    },
  },
  {
    timestamps: true,
  },
);

ApiTable.plugin(uniqueValidator);

module.exports = ApiTable;
