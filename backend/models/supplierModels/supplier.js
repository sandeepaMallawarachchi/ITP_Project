const mongoose = require('mongoose');

const   supplierSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true
    },
      
     address: {
        type:  String,
        required: true
    },
      email:{
           type:String,
           required:true
     },
     sid:{
          type:String,
          required:true
     }
});

const    Suppliermodel = mongoose.model(  'suppliermodel',   supplierSchema); // The first argument should be the singular name of your collection in MongoDB

module.exports = Suppliermodel;   
