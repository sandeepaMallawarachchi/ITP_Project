const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const netSalrySchema = new Schema({

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
        required : true
    },
    EPFbonus : {
        type : Number,
        required : true
    },
    netBonus : {
        type : Number,
        required : true
    },
    netSalary : {
        type : Number,
        required : true
    }

})

const Salary = mongoose.model("Salary",netSalrySchema);

module.exports = Salary;
