const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vacationStatusSchema = new Schema({

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
    status : {
        type : String,
        required : true
    },
    apprDate : {
        type : Date,
    },
    rejDate : {
        type : Date,
    },

})

const VacationStatus = mongoose.model("VacationStatus",vacationStatusSchema);

module.exports = VacationStatus;