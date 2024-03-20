const express=require("express");
const cors=require("cors");
const mongoose= require("mongoose");
const bodyParser=require("body-parser");
const dotenv=require("dotenv");
const app=express();
require("dotenv").config();

const PORT= process.env.PORT || 3013;

app.use(cors());
app.use(bodyParser.json());

const URL=process.env.MONGODB_URL;

mongoose.connect(URL,{
    useNewUrlParser:true,
    useUniFiedTopology:true
});

const connection=mongoose.connection;

connection.once("open",()=>{
    console.log("MongoDB connected");
});

const expensesRouter=require("./route/financials.js");
app.use("/expenses",expensesRouter);

const incomeRouter=require("./route/incomesheet.js");
app.use("/incomeRt",incomeRouter);

const totalIncomRouter=require("./route/totalIncome.js");
app.use("/totalIncome",totalIncomRouter);

app.listen(PORT,()=>{
    console.log(`app running server on ${PORT}`);
});