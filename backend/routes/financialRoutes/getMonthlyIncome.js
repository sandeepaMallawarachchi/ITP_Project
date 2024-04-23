const express = require('express');
const router = express.Router();
const Sales = require('../../models/salesModels/salesDetails');

router.get("/calculateTotalIncome", async (req, res) => {
    try {
        const { year, month } = req.body;

        // Validate year and month
        if (!year || !month) {
            return res.status(400).send({ error: "Year and month are required parameters" });
        }

        // Calculate the start and end dates for the specified month
        const firstDayOfMonth = new Date(year, month - 1, 1); // Construct start of month
        const lastDayOfMonth = new Date(year, month, 0); // Construct end of month

        // Find all sales records within the specified month
        const incomeRecords = await Sales.find({
            date: {
                $gte: firstDayOfMonth,
                $lte: lastDayOfMonth
            }
        });

        if (incomeRecords.length === 0) {
            return res.status(404).send({ error: "No sales records found for the specified year and month", year, month });
        }

        // Calculate total income and income details
        let totalIncome = 0;
        const incomeDetails = {};

        incomeRecords.forEach(sale => {
            const category = sale.category; // Assuming category is available in salesDetails model
            const amount = sale.totalPrice;
            
            if (!incomeDetails[category]) {
                incomeDetails[category] = 0;
            }
            
            incomeDetails[category] += amount;
            totalIncome += amount;
        });

        res.status(200).send({ status: "Monthly income details fetched", totalIncome });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error fetching details" });
    }
});

module.exports = router;
