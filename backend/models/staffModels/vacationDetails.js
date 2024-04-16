const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vacationSchema = new Schema({

    date : {
        type : Date,
        required : true
    },
    empName : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    department : {
        type : String,
        required : true
    },
    daysEarned : {
        type : Number,
        required : true
    },
    reqDate : {
        type : Date,
        required : true
    },
    returningDate : {
        type : Date,
        required : true
    },
    totDays : {
        type : Number,
        required : true
    },
    approvalDate : {
        type : Date,
        required : true
    },

})

const Vacation = mongoose.model("Vacation",vacationSchema);

module.exports = Vacation;