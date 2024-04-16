const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const managerSchema = new Schema({

    empId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },

    dateOfBirth: {
        type: Date,
        required: true
    },
})

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
