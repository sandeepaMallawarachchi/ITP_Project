const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema(
    {
        imageURL: {
            type: String,
            required: true
        },

        empId: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const EmployeeProfilePicture = mongoose.model("EmployeeProfilePicture", imageSchema);

module.exports = EmployeeProfilePicture;