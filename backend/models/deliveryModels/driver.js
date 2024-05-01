const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const driverSchema = new Schema({
       
    dname : {
        type : String,
        required: true
    },
    dID : {
        type : String,
        required: true
    },
    age : {
        type : Number,
        required: true
    },
    address : {
        type : String,
        required: true
    },
    phone_number : {
        type : Number,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    duration_of_job : {
        type : String,
        required: true
    }

})

const Driver = mongoose.model("Driver",driverSchema);

module.exports = Driver;