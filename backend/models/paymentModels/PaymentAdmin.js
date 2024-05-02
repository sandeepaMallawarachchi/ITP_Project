const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentAdminSchema = new Schema({

    ID : {
        type : Number,
        require : true
    },

    password : {
        type : String,
        require : true
    }

})

const PaymentAdmin = mongoose.model("PaymentAdmin",PaymentAdminSchema);

module.exports = PaymentAdmin;