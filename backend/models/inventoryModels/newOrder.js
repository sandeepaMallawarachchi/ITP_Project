const mongoose = require("mongoose")

const Schema = mongoose.Schema

const orderSchema = new Schema({

    productName : {
        type : String,
        required : true
    },
    
    teaType : {
        type : String,
        required : true
    },
    quantity :{
        type : Number,
        required : true,
        min : 0
    },
   
    date : {
        type : Date,
        required : true
    },
    status : {
        type : String,
        required : true
    }
},{timestamps : true})

const order = mongoose.model("Order",orderSchema)
module.exports = order