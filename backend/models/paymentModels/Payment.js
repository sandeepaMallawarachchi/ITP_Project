const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    
    cardnumber : {
        type : Number,
        require : true
    },

    cardholdername : {
        type : String,
        require : true
    },

    CVV : {
        type : Number,
        reqire : true
    }

})

const Payment = mongoose.model("Payment",PaymentSchema);

module.exports = Payment;
