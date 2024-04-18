const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyparser = require("body-parser");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8087;

app.use(cors());
app.use(bodyparser.json());




const URL = process.env.Mongodb_URL;

mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlparser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection = mongoose.connection
connection.once("open", () => {
    console.log("mongodb connect success");
})

const supplier = require("./routes/route1.js");
app.use("/supplier", supplier)


app.listen(PORT, () => {
    console
        .log("server is running");
})

