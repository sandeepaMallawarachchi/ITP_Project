const mongoose = require("mongoose")

const Schema = mongoose.Schema

const reorderSchema = new Schema({
    productName : {
        type : String,
        required : true
    },
    
    teaType : {
        type : String,
        required : true
    },
    stockLevel: {
        type : Number,
        required : true
    },
    reorderLevel : {
        type : Number,
        required : true
    }
    
    
},{timestamps : true})

const reorder = mongoose.model("reOrderProduct",reorderSchema)
module.exports = reorder
