const expressHandler = require("express-async-handler");
const Image = require("../models/License");

const postImage = expressHandler(async (req, res) => {
    try {
        if (!req.file) {
            return res.status(500).json({ error: "No file found" });
        }
        const imageFile = new Image({
            filename: req.file.filename,
            filepath: req.file.path,
        });

        const savedImage = await imageFile.save();

        res.status(200).json(savedImage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = { postImage };
