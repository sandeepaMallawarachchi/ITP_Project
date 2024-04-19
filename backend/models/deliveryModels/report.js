const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
       
    vehicleType : {
        type : String,
        required: true
    },
    monthlyDistance : {
        type : Number,
        required: true
    },
    fuelCost : {
        type : Number,
        required: true
    },
    serviceCharge : {
        type : Number,
        required: true
    },
    totalCost : {
        type : Number,
        required: true
    },
    

})

const Report = mongoose.model("Report",reportSchema);

module.exports = Report;