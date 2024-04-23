const express = require('express');
const router = express.Router();
const Sales = require('../../models/salesModels/salesDetails');

router.get("/getTotalSales", async (req, res) => {
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth, 0);

        const totalSales = await Sales.aggregate([
            {
                $match: {
                    date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" }
                }
            }
        ]);

        if (totalSales.length === 0) {
            return res.status(404).send({ error: "No sales records found for the current month and year" });
        }

        const totalSalesAmount = totalSales[0].totalSales;

        res.status(200).send({ totalSales: totalSalesAmount });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "Error fetching total sales" });
    }
});

module.exports = router;