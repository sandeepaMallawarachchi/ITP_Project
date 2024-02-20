const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teaPackSchema = new Schema({
    productCode : {
        type : String,
        required : true
    },
    teaType :{
        type : String,
        required : true
    },
    stockLevel : {
        type : Number,
        required : true
    },
    unitPrice : {
        type : Number,
        required : true
    },
    weight :{
        type : Number,
        required :true
    },
    packageType : {
        type : String,
        required : true
    },
    manDate : {
        type : Date,
        required : true
    },
    expDate : {
        type :Date,
        required : true
    },
    reorderLevel :{
        type : Number,
        required:true
    }
});

const teaPack = mongoose.model("TeaPack",teaPackSchema);
module.exports = teaPack;