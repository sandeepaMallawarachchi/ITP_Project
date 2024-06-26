const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const priceSchema = new Schema({
    productName: [{
        type: String,
        required: true
    }],
    price: [{
        type: String,
        required: true
    }]
});

const Prices = mongoose.model("Prices", priceSchema);

module.exports = Prices;