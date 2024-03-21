const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentDetailsSchema = new Schema({

    customerID : {
        type : Number,
        require : true
    },

    customerName : {
        type : String,
        require : true
    },

    totalamount : {
        type : Number,
        require : true
    },

    payamount : {
        type : Number,
        require : true
    },

    creditamount : {
        type : Number,
        require : true
    },

    dateandtime : {
        type : Date,
        require : true,
    },
    
})

const PaymentDetails = mongoose.model("PaymentDetails",PaymentDetailsSchema);

module.exports = PaymentDetails;