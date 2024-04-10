const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesmenSchema = new Schema({

    salespersonID: {
        type: String,
        required: true,
        unique: true,
    },

    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        unique: true,
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
        unique: true,
    },

    phone: {
        type: Number,
        required: true,
        unique: true,
    },

    address: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "salesperson"
    }
});

const Salesmen = mongoose.model("Salesmen", salesmenSchema);

module.exports = Salesmen;