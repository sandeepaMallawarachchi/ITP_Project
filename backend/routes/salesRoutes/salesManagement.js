const router = require("express").Router();
let Sales = require("../../models/salesModels/salesDetails");
let Bulk = require("../../models/salesModels/bulkManagement");
let teaPack = require("../../models/inventoryModels/product");
let Salesmen = require("../../models/salesmenModels/salesmenDetails");
let SalesReport = require("../../models/salesModels/reportDetails");

//add tea daily stock for salesperson
router.route("/addStock").post(async (req, res) => {
    const { salesPersonID, salesPersonName, productName, totalStock } = req.body;
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);

    try {

        const stockLevel = await teaPack.findOne({ productName: productName });
        if (!stockLevel) {
            throw new Error("Product not found in inventory");
        }
        else if (stockLevel.stockLevel < 1) {
            throw new Error("Out of stock level");
        }
        else if (stockLevel.stockLevel < totalStock) {
            throw new Error("Not enough stock level");
        }

        stockLevel.stockLevel = parseInt(stockLevel.stockLevel) - parseInt(totalStock);

        await stockLevel.save();

        let existingStock = await Bulk.findOne({ salesPersonID, productName, date });

        let newStock;

        if (existingStock) {

            existingStock.totalStock = parseInt(existingStock.totalStock) + parseInt(totalStock);

            await existingStock.save();
            res.json({ status: "Stock updated", sales: existingStock });
        } else {
            newStock = await Bulk.create({
                salesPersonID,
                salesPersonName,
                productName,
                totalStock,
            });
            res.json({ status: "Stock added", sales: newStock });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
});

//all salespersons
router.route("/getSalespersons").get(async (req, res) => {
    try {
        // Find all salesperosns details
        const salesPersonDetails = await Salesmen.find();

        if (salesPersonDetails.length === 0) {
            return res.status(500).send({ error: "No salesperson records found" });
        }

        res.status(200).send({ status: "Salesperson details fetched", salesPersonDetails });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error fetching details" });
    }
});

//total sales for particular product
router.route("/getSalespersonSales/:salesPersonID").get(async (req, res) => {
    const salesPersonID = req.params.salesPersonID;

    try {
        // Find all sales records for the given salesperson
        const salesRecords = await Sales.find({ salesPersonID: salesPersonID });

        if (!salesRecords || salesRecords.length === 0) {
            return res.status(500).send({ error: "No sales records found" });
        }

        const salesDetails = [];
        let totalAmount = 0;

        for (const sale of salesRecords) {
            if (sale) {
                const productName = sale.productName;
                const formattedDate = new Date(sale.date).toISOString().split('T')[0];

                // Check if the tea type already exists in salesDetails
                const existingSale = salesDetails.find(item => item.productName === productName);

                if (!existingSale) {
                    salesDetails.push({
                        productName,
                        amount: sale.amount,
                        date: formattedDate
                    });
                } else {
                    existingSale.amount += sale.amount;
                }

                totalAmount += sale.amount;
            }
        }

        const totalSales = salesRecords.length;
        res.status(200).send({ status: "Sales details fetched", totalSales, totalAmount, salesDetails });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error fetching details" });
    }
});

//get remaining stock of products
router.route("/getRemainingStock").get(async (req, res) => {
    try {

        const stockDetails = await teaPack.find();

        res.json(stockDetails);
    } catch (error) {
        console.error("Error fetching remaining stock:", error.message);
        res.status(500).json({ error: "Internal server error" });
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

//upload monthly report
router.route("/uploadReport").post(async (req, res) => {

    const { downloadURL } = req.body;

    if (!downloadURL) {
        res.status(400).send({ status: "File url not found" });
    }

    try {

        const report = await SalesReport.create({ downloadURL });

        res.status(200).send({ status: "file uploaded successfully", report });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error uploading file" });
    }
});

module.exports = router;