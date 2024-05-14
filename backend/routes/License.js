const express = require("express");
const { upload } = require("../models/upload");
const { postImage } = require("../models/controller");


const Router = express.Router();

Router.post("/upload", upload.single("image"), postImage);

module.exports = Router;
