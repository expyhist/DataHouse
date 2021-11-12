
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Filter = new mongoose.Schema(
    {
        rangeDate: [{
            title:{type: String},
            startDate:{type: String},
            endDate:{type: String}
        }],
        singleDate: [{
            title:{type: String},
            date:{type: String}
        }],
        text: [{
            title:{type: String},
            text:{type: String}
        }],
        enum: [{
            title:{type: String},
            enum:{type: Array}
        }]
    },
    {
        timestamps: true
    }
);

Filter.plugin(uniqueValidator);

module.exports = mongoose.model("filters", Filter);