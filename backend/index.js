const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const session = require('express-session');
require("dotenv").config();

const app = express();

app.use(cors({
    origin: ['https://hendrik-s-tea-management-system-frontend.vercel.app'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 2 * 24 * 60 * 60 * 1000 }
}));

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb connected successfully");
});

// Routes
const salesRouter = require("./routes/salesRoutes/sales.js");
const salesmenRouter = require("./routes/salesRoutes/salesmen.js");
const salesManagementRouter = require("./routes/salesRoutes/salesManagement.js");

app.use("/sales", salesRouter);
app.use("/salesmen", salesmenRouter);
app.use("/salesManagement", salesManagementRouter);

const invRouter = require("./routes/inventoryRoutes/product.js");
const orderRouter = require("./routes/inventoryRoutes/newOrder.js");
const reorderRouter = require("./routes/inventoryRoutes/reorderFunction.js");

app.use("/inventory/product", invRouter);
app.use("/inventory/orders", orderRouter);
app.use("/inventory/reorder", reorderRouter);

const salaryRouter = require("./routes/staffRoutes/salary.js");
const staffRouter = require("./routes/staffRoutes/staff.js");
const vacationRouter = require("./routes/staffRoutes/vacation.js");
const employeeLoginRouter = require("./routes/staffRoutes/employeeLogin.js");
const vacationStatusRouter = require("./routes/staffRoutes/vacationStatus.js");
const topSellers = require("./routes/staffRoutes/topSellers.js");

app.use("/staff", staffRouter);
app.use("/staff/salary", salaryRouter);
app.use("/staff/vacation", vacationRouter);
app.use("/empLogin", employeeLoginRouter);
app.use("/staff/vacationStatus", vacationStatusRouter);
app.use("/staff/topSellerStatus", topSellers);

const expensesRouter = require("./routes/financialRoutes/financials.js");
const incomeRouter = require("./routes/financialRoutes/incomesheet.js");
const getTotalIncome = require("./routes/financialRoutes/totalIncome.js");
const balance = require("./routes/financialRoutes/balanceSheet.js");
const totalSalary = require("./routes/financialRoutes/TotalSalary.js");
const totalDelivery = require("./routes/financialRoutes/totalDelivery.js");
const totalPrice = require("./routes/financialRoutes/totalSupplies.js");
const getTotalExpenses = require("./routes/financialRoutes/totalExpenses.js");
const getMonthlyIncome = require("./routes/financialRoutes/getMonthlyIncome.js");
const totalLiabilities = require("./routes/financialRoutes/balanceSheet.js");
const totalAssets = require("./routes/financialRoutes/balanceSheet.js");
const getTotalBalance = require("./routes/financialRoutes/balanceSheet.js");

app.use("/expenses", expensesRouter);
app.use("/incomeRt", incomeRouter);
app.use("/getTotalIncome", getTotalIncome);
app.use("/balanceRt", balance);
app.use("/totalSalary", totalSalary);
app.use("/totalDelivery", totalDelivery);
app.use("/totalPrice", totalPrice);
app.use("/getTotalExpenses", getTotalExpenses);
app.use("/getMonthlyIncome", getMonthlyIncome);
app.use("/totalLiabilities", totalLiabilities);
app.use("/totalAssets", totalAssets);
app.use("/getTotalBalance", getTotalBalance);

const supplier = require("./routes/supplierRoutes/supplier.js");

app.use("/supplier", supplier);

const teaRouter = require("./routes/deliveryRoutes/Locations.js");
const driverRouter = require("./routes/deliveryRoutes/driver.js");
const reportRouter = require("./routes/deliveryRoutes/report.js");

app.use("/tea", teaRouter);
app.use("/driver", driverRouter);
app.use("/report", reportRouter);

const paymentRouter = require("./routes/paymentRoutes/payment.js");
const paymentDetailsRouter = require("./routes/paymentRoutes/paymentdetails.js");
const paymentAdminRouter = require("./routes/paymentRoutes/paymentadmin.js");

app.use("/paymentdetails", paymentDetailsRouter);
app.use("/payment", paymentRouter);
app.use("/paymentadmin", paymentAdminRouter);

module.exports = app;