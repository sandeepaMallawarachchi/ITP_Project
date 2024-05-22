const router = require("express").Router();
const Sales = require("../../models/salesModels/salesDetails");
const Salesmen = require("../../models/salesmenModels/salesmenDetails");

router.route("/topSellers").get(async (req, res) => {
    try {
        const topSellers = await Sales.aggregate([
            { 
                $group: { 
                    _id: "$salesPersonID", 
                    totalSales: { $sum: "$totalPrice" } 
                } 
            },
            { $sort: { totalSales: -1 } },
            { $limit: 3 }
        ]);

        const names = [];
        for (const seller of topSellers) {
            const sellerName = await Salesmen.findOne({ salespersonID: seller._id });
            names.push(sellerName.name);
        }

        res.status(200).send({ status: "Top sellers fetched", topSellers, names });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error fetching top sellers" });
    }
});

module.exports = router;