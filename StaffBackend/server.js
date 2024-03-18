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

const staffRouter = require("./routes/staff.js");
const netSalaryRouter = require("./routes/netSalary.js");

app.use("/staff",staffRouter);
app.use("/netSalary",netSalaryRouter);

app.listen(PORT, ()=>{
    console.log(`Server is up and running on port number: ${PORT}`)
})