const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyparser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open" , () => {
    console.log("MongoDB connection successfull ! ");
});

const paymentRouter = require("./routes/payment.js");
app.use("/payment", paymentRouter);

const paymentdetailsRouter = require("./routes/paymentdetails.js");
app.use("/paymentdetails",paymentdetailsRouter);

const paymentadminRouter = require("./routes/paymentadmin.js");
app.use("/paymentadmin",paymentadminRouter);

app.listen(PORT , () => {
    console.log(`Server is running on PORT ${PORT}`)
})






