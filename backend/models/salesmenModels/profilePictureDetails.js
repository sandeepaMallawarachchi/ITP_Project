const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema(
    {
        imageURL: {
            type: String,
            required: true
        },

        salespersonID: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const ProfilePicture = mongoose.model("ProfilePicture", imageSchema);

module.exports = ProfilePicture;