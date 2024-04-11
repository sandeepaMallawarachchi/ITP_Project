const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffManagerSchema = new Schema({

    empId : {
        type : String,
        required : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    department : {
        type : String,
        required : true
    },
    designation : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phoneNo : {
        type : String,
        required : true
    }

})

const StaffManager = mongoose.model("StaffManager",staffManagerSchema);

module.exports = StaffManager;