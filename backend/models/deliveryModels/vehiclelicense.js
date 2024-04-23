const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehiclelicenseSchema = new Schema(
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

const VehicleLicense = mongoose.model("VehicleLicense", vehiclelicenseSchema);

module.exports = VehicleLicense;