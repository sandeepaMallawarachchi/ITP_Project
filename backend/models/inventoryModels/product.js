const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teaPackSchema = new Schema({
    productName : {
        type : String,
        required : true,
    },
    
    teaType :{
        type : String,
        required : true
    },
    stockLevel : {
        type : Number,
        required : true,
        min : 0
    },
    unitPrice : {
        type : Number,
        required : true,
        min : 0
    },
    weight :{
        type : Number,
        required :true,
        min : 0
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
        required:true,
        min : 0
    },
    emailSent : {
        type : Boolean,
        required : true
    }
},{timestamps : true});

const teaPack = mongoose.model("Product",teaPackSchema);
module.exports = teaPack;