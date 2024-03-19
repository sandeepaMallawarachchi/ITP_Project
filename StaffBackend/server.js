const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopologyL: true,
    useFindAndModify: false
})

const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("Mongodb Connection Success!");
})

const StaffRouter = require("./routes/Staff.js");
const NetSalaryRouter = require("./routes/NetSalary.js");

app.use("/Staff",StaffRouter);
app.use("/NetSalary",NetSalaryRouter);

app.listen(PORT, ()=>{
    console.log(`Server is up and running on port number: ${PORT}`)
})