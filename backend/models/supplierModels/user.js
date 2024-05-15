const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    paymentmethod: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now // Use Date.now() to get the current date
    } ,
     teatype: {
        type: String,
        required: true
    }, 
     sid: {
        type: String,
        required: true
    },
     amount: {
        type: String,
        required: true
    }  
    }
    
 );

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
