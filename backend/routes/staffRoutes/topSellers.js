const router = require("express").Router();
let Sales = require("../../models/salesModels/salesDetails");

// Fetch top 5 sellers
router.route("/topSellers").get(async (req, res) => {
    try {
        // Fetch top 5 sellers based on some criteria
        const topSellers = await Sales.aggregate([
            { $group: { _id: "$salesPersonID", totalSales: { $sum: "$totalPrice" } } },
            { $sort: { totalSales: -1 } },
            { $limit: 3 }
        ]);

        res.status(200).send({ status: "Top sellers fetched", topSellers });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error fetching top sellers" });
    }
});

module.exports = router; 