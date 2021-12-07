const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Menu = new mongoose.Schema(
  {
    path: { type: String, require: true, unique: true },
    name: { type: String, require: true, unique: true },
    icon: { type: String },
    auth: { type: Array },
    parentPath: { type: String, require: true },
  },
  {
    timestamps: true,
  },
);

Menu.plugin(uniqueValidator);

module.exports = mongoose.model('menus', Menu);
