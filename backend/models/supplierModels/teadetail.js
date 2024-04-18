const mongoose = require('mongoose');

const  teaSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const   Teamodel = mongoose.model('Teamodel',  teaSchema); // The first argument should be the singular name of your collection in MongoDB

module.exports =Teamodel;   
