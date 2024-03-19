const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb connected successfully");
});

const salesRouter = require("./routes/sales.js");
const salesmenRouter = require("./routes/salesmen.js");
const salesManagementRouter = require("./routes/salesManagement.js");

app.use("/sales", salesRouter);
app.use("/salesmen", salesmenRouter);
app.use("/salesManagement", salesManagementRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});