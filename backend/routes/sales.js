const router = require("express").Router();
let Sales = require("../models/salesModels/salesDetails");
let Prices = require("../models/salesModels/priceDetails");
// let Summary = require("../models/salesModels/summary");
let Bulk = require("../models/salesModels/bulkManagement");
let Discount = require("../models/salesModels/discounts");

//add a new sale
router.route("/addSale").post(async (req, res) => {

    const teaType = req.body.teaType;
    const amount = req.body.amount;
    const sellingPrice = req.body.sellingPrice;
    const cusID = req.body.cusID;
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
        let standardPrice = priceDocument.price[index];

        //calculate total price
        let totalPrice = sellingPrice * amount;

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

        // Save the sales information
        const newSale = await Sales.create({
            cusID,
            teaType: teaType,
            amount,
            standardPrice,
            sellingPrice,
            totalPrice,
        });

        res.json({ status: "Sale added", sales: newSale });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Error adding sale" });
    }
});

//get customer total sales by id
router.route("/get/:cusID").get(async (req, res) => {
    const cusID = req.params.cusID;
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);

    try {
        // Find all sales records for the specified customer and date
        const salesRecords = await Sales.find({ cusID, date });

        // Calculate subtotal by summing up total prices from sales records
        let subTotal = 0;
        let salesDetails = [];

        for (const sale of salesRecords) {
            subTotal += sale.totalPrice;
            salesDetails.push({
                teaType: sale.teaType,
                amount: sale.amount,
                sellingPrice: sale.sellingPrice
            });
        }

        res.status(200).send({ status: "Subtotal calculated", cusID, subTotal, date, salesDetails });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error calculating subtotal" });
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
router.route("/stocks").get((req, res) => {

    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);

    Bulk.find({ date: date }).then((bulks) => {
        res.json(bulks);
    }).catch((err) => {

        console.log(err);
    });
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

//search bulk
router.route("/searchBulk").get(async (req, res) => {

    const teaType = req.body.teaType;
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);

    try {

        // Find the remaining tea bulk
        const remainingbulk = await Bulk.findOne({ teaType: teaType, date: date });

        if (remainingbulk) {
            totalBulk = remainingbulk.totalBulk;
            res.status(200).send({ status: `${teaType} is available`, totalBulk });
        } else {
            res.status(404).send({ status: `Reamainig bulk of ${teaType} is not found!` });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error!", error: error.message });
    }
});

module.exports = router;