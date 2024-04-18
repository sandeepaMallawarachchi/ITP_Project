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
        type: String ,
        required: true
    },
    quantity: {
        type: String ,
        required: true
    }
});

const   Teamodel = mongoose.model('Teamodel',  teaSchema); // The first argument should be the singular name of your collection in MongoDB

module.exports =Teamodel;   
