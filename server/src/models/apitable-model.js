const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const ApiTable = new mongoose.Schema(
  {
    url: { 
      type: String, 
      require: true, 
      unique: true, 
      validate: { 
        validator: (val) => {
          urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
          return urlRegex.test(val);
        },
        message: (props) => `${props.value} is not a valid url!`},
      },
    title: { type: String, require: true, unique: true },
    author: { type: String, require: true },
    applicant: { type: String, require: true },
    connection: { type: Map, of: mongoose.Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  },
);

ApiTable.plugin(uniqueValidator);

module.exports = mongoose.model('apitables', ApiTable);
