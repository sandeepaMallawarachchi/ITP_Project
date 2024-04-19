const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String, 
        required: true
    },
    address: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    delivery_code: {
        type: String,
        required: true
    }
});

const Tea = mongoose.model("Tea", teaSchema);

module.exports = Tea;