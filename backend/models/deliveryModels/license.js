const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const licenseSchema = new Schema(
    {
        downloadURL: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const DriverLicense = mongoose.model("DriverLicense", licenseSchema);

module.exports = DriverLicense;