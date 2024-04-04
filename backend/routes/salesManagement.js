const router = require("express").Router();
let Sales = require("../models/salesModels/salesDetails");
let Prices = require("../models/salesModels/priceDetails");
// let Summary = require("../models/salesModels/summary");
let Bulk = require("../models/salesModels/bulkManagement");
let teaPack = require("../models/inventoryModels/product");
let Salesmen = require("../models/salesmenModels/salesmenDetails");

//add tea daily stock for salesperson
router.route("/addStock").post(async (req, res) => {
    const { salesPersonID, salesPersonName, productName, totalStock } = req.body;

    try {
        let existingStock = await Bulk.findOne({ salesPersonID, productName });

        if (existingStock) {
            existingStock.totalStock = parseInt(existingStock.totalStock) + parseInt(totalStock);
            await existingStock.save();
            res.json({ status: "Stock updated", sales: existingStock });
        } else {
            const newStock = await Bulk.create({
                salesPersonID,
                salesPersonName,
                productName,
                totalStock,
            });

            const stockLevel = await teaPack.findOne({ productName: productName });
            if (!stockLevel) {
                throw new Error("Product not found in inventory");
            }

            stockLevel.stockLevel = parseInt(stockLevel.stockLevel) - parseInt(totalStock);
            if (stockLevel.stockLevel < 0) {
                throw new Error("Not enough stock level");
            }

            await stockLevel.save();
            res.json({ status: "Stock added", sales: newStock });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});

//All salespersons
router.route("/getSalespersons").get(async (req, res) => {
    try {
        const salesPersons = await Salesmen.find();
        res.json(salesPersons);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Error fetching salespersons" });
    }
});

router.route("/getRemainingStock").get(async (req, res) => {
    try {
        const bulk = await teaPack.find();
        res.json(bulk);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Error fetching bulk" });
    }
});

//all sales
router.route("/getSales").get(async (req, res) => {

    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);

    try {
        const sales = await Sales.find();
        res.json(sales);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Error fetching sales" });
    }
});

//total sales for particular product
router.route("/getTotalSales").get(async (req, res) => {

    const date = new Date().toISOString().split('T')[0];

    try {
        // Find all sales records
        const salesRecords = await Sales.find();

        if (salesRecords.length === 0) {
            return res.status(500).send({ error: "No sales records found" });
        }

        const salesDetails = [];
        let totalAmount = 0;

        for (const sale of salesRecords) {

            const productName = sale.productName;

            // Check if the tea type already exists in salesDetails
            const existingSale = salesDetails.find(item => item.productName === productName);

            if (!existingSale) {
                salesDetails.push({
                    productName,
                    amount: sale.amount
                });
            } else {
                existingSale.amount += sale.amount;
            }

            totalAmount += sale.amount;
        }

        const totalSales = salesRecords.length;
        res.status(200).send({ status: "Sales details fetched", salesDetails, totalSales, totalAmount });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error fetching details" });
    }
});

module.exports = router;