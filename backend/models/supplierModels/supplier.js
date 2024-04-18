const mongoose = require('mongoose');

const   supplierSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true
    },
     age: {
        type:  Number,
        required: true
    },
     address: {
        type:  String,
        required: true
    } 
       
});

const    Suppliermodel = mongoose.model(  'suppliermodel',   supplierSchema); // The first argument should be the singular name of your collection in MongoDB

module.exports = Suppliermodel;   
