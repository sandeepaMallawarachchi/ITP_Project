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
            { $limit: 3 },
            { 
                $lookup: {
                    from: "salesmenDetails",
                    localField: "_id",
                    foreignField: "_id",
                    as: "salesperson"
                }
            },
            {
                $unwind: "$salesperson"
            },
            {
                $project: {
                    _id: 1,
                    totalSales: 1,
                    name: "$salesperson.name"
                }
            }
        ]);

        res.status(200).send({ status: "Top sellers fetched", topSellers });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error fetching top sellers" });
    }
});

module.exports = router; 