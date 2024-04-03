const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bulckSchema = new Schema({

    salesPersonID: {
        type: String,
        required: true
    },

    salesPersonName: {
        type: String,
        required: true
    },

    productName: {
        type: String,
        required: true
    },

    totalStock: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: () => { // Use a function to set the default date
            const today = new Date();
            today.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
            return today;
        }
    },
});

const Bulk = mongoose.model("Bulk", bulckSchema);

module.exports = Bulk;