
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const User = new mongoose.Schema(
    {
        username: {type: String, require: true},
        password: {type: String, require: true},
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    },
    {
        timestamps: true
    }
);

Menu.plugin(uniqueValidator);

module.exports = mongoose.model("users", User);