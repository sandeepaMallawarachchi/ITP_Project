const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesmenSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    confirmPassword: {
        type: String,
        required: true
    },

    dateOfBirth: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    email: {
        type: String,
    },

    phone: {
        type: Number,
        required: true
    },

    address: {
        type: String,
        required: true
    },
});

const Salesmen = mongoose.model("Salesmen", salesmenSchema);

module.exports = Salesmen;