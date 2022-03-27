const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const rules = require('../utils/rules');

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: rules.email,
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: { type: String, required: true },
    rolesName: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

User.plugin(uniqueValidator);

module.exports = User;
