const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const rules = require('../utils/rules');

const Menu = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: rules.path,
        message: (props) => `${props.value} is not a valid path!`,
      },
    },
    name: { type: String, required: true, unique: true },
    icon: { type: String },
    auth: { type: Array },
    parentPath: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

Menu.plugin(uniqueValidator);

module.exports = Menu;
