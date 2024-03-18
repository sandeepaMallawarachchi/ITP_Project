const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BonusSchema = new Schema({

    empId : {
        type : String,
        required : true
    },
    designation : {
        type : String,
        required : true
    },
    Month : {
        type : String,
        required : true
    },
    basicSalary : {
        type : String,
        required : true
    },
    bonusType : {
        type : String,
        required : true
    },
    netBonus : {
        type : String,
        required : true
    },
    netSalary : {
        type : String,
        required : true
    }

})

const Bonus = mongoose.model("Bonus",BonusSchema);

module.exports = Bonus;