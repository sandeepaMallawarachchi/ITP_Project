const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rawTeaSchema = new Schema({
    teaType : {
        type :String,
        required : true
    },
    weight : {
        type : Number,
        required: true
    },
    stockLevel : {
        type : Number,
        required : true
    },
    unitPrice : {
        type : Number,
        required : true
    },
    supplier : {
        type : String,
        required: true
    },
    purchasedDate : {
        type : Date,
        required : true
    }
});

const rawTea = mongoose.model("RawTea",rawTeaSchema);

module.exports = rawTea;