const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const User = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
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

module.exports = mongoose.model('users', User);
