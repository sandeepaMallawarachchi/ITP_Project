const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const discountSchema = new Schema({
    teaType: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    cusID: {
        type: String,
        required: true
    },

    discription: {
        type: String,
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

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;