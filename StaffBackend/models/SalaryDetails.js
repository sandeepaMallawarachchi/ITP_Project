const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BasicSalarySchema = new Schema({

    empId : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    designation : {
        type : String,
        required : true
    },
    month : {
        type : String,
        required : true
    },
    basicSalary : {
        type : Number,
        required : true
    },
    ETFbonus : {
        type : Number,
    },
    EPFbonus : {
        type : Number,
    },
    netBonus : {
        type : Number,
        // required : true
    },
    netSalary : {
        type : Number,
        // required : true
    }

})

const BasicSalary = mongoose.model("BasicSalary",BasicSalarySchema);

module.exports = BasicSalary;