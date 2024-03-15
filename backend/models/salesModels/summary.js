const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const summarySchema = new Schema({

    id: {
        type: String,
        required: true
    },

    cusID: {
        type: String,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        ddefault: () => { // Use a function to set the default date
            const today = new Date();
            today.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
            return today;
        }
    },
    salesDetails: [{
        teaType: String,
        amount: String,
        sellingPrice: String
    }],
});

const Summary = mongoose.model("Summary", summarySchema);

module.exports = Summary;