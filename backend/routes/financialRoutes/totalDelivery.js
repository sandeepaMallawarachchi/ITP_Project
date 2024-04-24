const express = require('express');
const router = express.Router();
const Delivery = require('../../models/deliveryModels/report');

router.get("/totalDelivery", async (req, res) => {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth, 0);

        const totalCost = await Report.aggregate([
            {
                $match: {
                    date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
                }
            },
            {
                $group: {
                    _id: null,
                    totalCostSum: { $sum: "$totalCost" }
                }
            }
        ]);

        if (totalCost.length === 0) {
            return res.status(404).send({ error: "No cost records found for the current month and year" });
        }

        const totalCostAmount = totalCost[0].totalCostSum;

        res.status(200).send({ totalCost: totalCostAmount });

    } catch (error) {
        console.error("Error fetching total cost:", error);
        res.status(500).send({ error: "Error fetching total cost" });
    }
});

module.exports = router;
