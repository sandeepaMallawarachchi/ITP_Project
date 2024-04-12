const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema(
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

const SalesReport = mongoose.model("SalesReport", reportSchema);

module.exports = SalesReport;