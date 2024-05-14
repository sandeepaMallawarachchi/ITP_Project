const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
});

const connection = mongoose.connection;
connection.once("open", () =>{
    console.log("Mongodb Connection success!");
})

const teaRouter = require("./routes/Locations.js");

app.use("/tea",teaRouter);

const driverRouter = require("./routes/driver.js");

app.use("/driver",driverRouter);

const licenseRouter = require("./routes/License.js");

app.use("/License",licenseRouter);


const reportRouter = require("./routes/report.js");

app.use("/report",reportRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`)
})

