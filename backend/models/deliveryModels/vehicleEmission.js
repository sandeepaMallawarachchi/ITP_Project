const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleEmissionSchema = new Schema(
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

const VehicleEmission = mongoose.model("VehicleEmission", vehicleEmissionSchema);

module.exports = VehicleEmission;