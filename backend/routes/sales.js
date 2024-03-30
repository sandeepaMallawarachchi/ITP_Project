const router = require("express").Router();
let Sales = require("../models/salesModels/salesDetails");
let Prices = require("../models/salesModels/priceDetails");
// let Summary = require("../models/salesModels/summary");
let Bulk = require("../models/salesModels/bulkManagement");
let Discount = require("../models/salesModels/discounts");

//add a new sale
router.route("/addSale/:id").post(async (req, res) => {
    const salesPersonID = req.params.id;
    const { teaType, amount, sellingPrice, cusID } = req.body;
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);

    try {
        // Retrieve standard price based on the tea type selected
        const priceDocument = await Prices.findOne({ teaType: teaType });

        if (!priceDocument) {
            throw new Error("Tea type not found");
        }

        // Get the index of the teaType in the array
        const index = priceDocument.teaType.indexOf(teaType);
        if (index === -1) {
            throw new Error("Tea type not found");
        }

        // Get the standard price corresponding to the teaType
        const standardPrice = priceDocument.price[index];

        // Calculate total price
        const totalPrice = sellingPrice * amount;

        // Retrieve total bulk based on the tea type selected
        const bulk = await Bulk.findOne({ salesPersonID: salesPersonID, teaType: teaType, date: date });

        if (!bulk) {
            throw new Error("Bulk information not found");
        }

        // Check if there is enough stock
        if (amount > bulk.totalStock) {
            return res.status(400).json({ error: "Not enough bulk!", remaining: bulk.totalStock });
        } else if (bulk.totalStock === 0) {
            return res.status(400).json({ error: "Out of stock!" });
        }

        // Update the totalStock
        bulk.totalStock -= amount;
        await bulk.save();

        // Save the sales information
        const newSale = await Sales.create({
            salesPersonID,
            cusID,
            teaType: teaType,
            amount,
            standardPrice,
            sellingPrice,
            totalPrice,
        });

        res.json({ status: "Sale added", sales: newSale, standardPrice });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Error adding sale" });
    }
});


//get standard price
router.route("/getStandardPrice/:teaType").get(async (req, res) => {
    const teaType = req.params.teaType;

    try {
        // Retrieve standard price based on the tea type selected
        const priceDocument = await Prices.findOne({ teaType: teaType });

        if (!priceDocument) {
            throw new Error("Tea type not found!");
        }

        // Get the index of the teaType in the array
        const index = priceDocument.teaType.indexOf(teaType);
        if (index === -1) {
            throw new Error("Tea type not found!");
        }

        // Get the standard price corresponding to the teaType
        let standardPrice = priceDocument.price[index];

        res.status(200).send({ status: "Standard price", standardPrice });
    } catch (error) {
        res.status(500).send({ error: "Error fetching standard price!" });
    }
});

//get customer total sales by id
router.route("/getSalesSummary/:cusID").get(async (req, res) => {
    const cusID = req.params.cusID;
    const date = new Date().toISOString().split('T')[0];

    try {
        // Find all sales records for the specified customer and date
        const salesRecords = await Sales.find({ cusID, date });

        if (salesRecords.length === 0) {
            return res.status(500).send({ error: "No sales records found for the specified customer ID" });
        }

        // Calculate subtotal by summing up total prices from sales records
        let subTotal = 0;
        let salesDetails = [];

        for (const sale of salesRecords) {
            subTotal += sale.totalPrice;
            salesDetails.push({
                _id: sale._id,
                teaType: sale.teaType,
                amount: sale.amount,
                sellingPrice: sale.sellingPrice,
                totalPrice: sale.totalPrice,
            });
        }

        res.status(200).send({ status: "Data fetched", cusID, subTotal, date, salesDetails });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error fetching data" });
    }
});

//get daily sales details of a particular salesperson
router.route("/getDailySales/:salesPersonID").get(async (req, res) => {
    const salesPersonID = req.params.salesPersonID;
    const date = new Date().toISOString().split('T')[0];

    try {
        // Find all sales records for the specified salesperson and date
        const salesRecords = await Sales.find({ salesPersonID, date });

        if (salesRecords.length === 0) {
            return res.status(500).send({ error: "No sales records found for the specified salesperson ID" });
        }

        const salesDetails = [];
        let totalAmount = 0;
        let totalCustomers = new Set();

        for (const sale of salesRecords) {

            const teaType = sale.teaType;

            // Check if the tea type already exists in salesDetails
            const existingSale = salesDetails.find(item => item.teaType === teaType);

            if (!existingSale) {
                salesDetails.push({
                    teaType,
                    amount: sale.amount
                });
            } else {
                existingSale.amount += sale.amount;
            }

            totalAmount += sale.amount;
            totalCustomers.add(sale.cusID);
        }

        // const totalAmount = salesRecords.reduce((total, sale) => total + sale.amount, 0);
        const customers = totalCustomers.size;
        const totalSales = salesRecords.length;
        res.status(200).send({ status: "Sales details fetched", salesDetails, totalSales, totalAmount, customers });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error fetching details" });
    }
});

//delete sale
router.route("/deleteSale/:saleID").delete(async (req, res) => {

    let saleID = req.params.saleID;

    try {

        await Sales.findByIdAndDelete(saleID);
        res.status(200).send({ status: "Sale deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error!", error: error.message });
    }
});

//add tea bulk
router.route("/addBulk").post(async (req, res) => {

    const teaType = req.body.teaType;
    const totalBulk = req.body.totalBulk;

    try {
        // Save the tea bulk information
        const newBulk = await Bulk.create({
            teaType,
            totalBulk,
        });

        res.json({ status: "Bulk added", sales: newBulk });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Error adding bulk" });
    }
});

//get all stocks
router.route("/stocks/:salesPersonID").get(async (req, res) => {

    const salesPersonID = req.params.salesPersonID;

    try {
        const date = new Date();
        date.setUTCHours(0, 0, 0, 0);

        const bulks = await Bulk.find({ salesPersonID: salesPersonID, date: date });

        if (bulks.length === 0) {
            return res.status(404).json({ error: "No stocks found for the provided salesPersonID and date" });
        }

        res.json(bulks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error fetching stocks" });
    }
});


// //get remaining stock of a salesperson
// router.route("/remainingStock/:id").get((req, res) => {

//     const { id } = req.params.id;
//     const date = new Date();
//     date.setUTCHours(0, 0, 0, 0);

//     try {
//         const remainingStock = Bulk.find({ id, date });
//         res.json(remainingStock);
//     } catch (error) {
//         console.log(error.message);
//     }
// });

//search bulk
router.route("/searchBulk/:salesPersonID").get(async (req, res) => {

    const salesPersonID = req.params.salesPersonID;
    const teaType = req.body.teaType;
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);

    try {

        // Find the remaining tea bulk
        const remainingbulk = await Bulk.findOne({ salesPersonID: salesPersonID, teaType: teaType, date: date });

        if (remainingbulk) {
            const totalBulk = remainingbulk.totalBulk;
            res.status(200).send({ status: `${teaType} is available`, totalBulk });
        } else {
            res.status(404).send({ status: `${teaType} is not found!` });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error!", error: error.message });
    }
});

//discounts
router.route("/discounts/:cusID").post(async (req, res) => {

    const teaType = req.body.teaType;
    const amount = req.body.amount;
    const discription = req.body.discription;
    const cusID = req.params.cusID;
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);

    // Retrieve total bulk based on the tea type selected
    let bulk = await Bulk.findOne({ teaType: teaType, date: date });

    if (!bulk) {
        throw new Error("Bulk information not found");
    }

    // Check if there is enough stock
    if (bulk.totalBulk === 0) {
        return res.status(400).json({ error: "Out of stock!" });
    }
    else if (amount > bulk.totalBulk) {
        return res.status(400).json({ error: "Not enough bulk!", remaining: bulk.totalBulk });
    }

    // Update the totalBulk
    bulk.totalBulk -= amount;
    await bulk.save();

    try {
        // Save the tea bulk information
        const newDiscount = await Discount.create({
            cusID,
            teaType,
            amount,
            discription,
        });

        res.json({ status: "Discount added", discount: newDiscount });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Error adding discount" });
    }
});

module.exports = router;