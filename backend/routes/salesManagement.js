const router = require("express").Router();
let Sales = require("../models/salesModels/salesDetails");
let Prices = require("../models/salesModels/priceDetails");
// let Summary = require("../models/salesModels/summary");
let Bulk = require("../models/salesModels/bulkManagement");
let Discount = require("../models/salesModels/discounts");

//add tea daily stock for salesperson
router.route("/addStock").post(async (req, res) => {

    const salesPersonID = req.body.salesPersonID;
    const salesPersonName = req.body.salesPersonName;
    const teaType = req.body.teaType;
    const totalStock = req.body.totalStock;

    try {
        // Save the tea stock information
        const newStock = await Bulk.create({
            salesPersonID,
            salesPersonName,
            teaType,
            totalStock,
        });

        res.json({ status: "Stock added", sales: newStock });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Error adding stock" });
    }
});

module.exports = router;