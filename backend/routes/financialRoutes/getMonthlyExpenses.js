const express = require('express');
const router = express.Router();

const calculateTotalExpenses = async () => {
    // Your calculation logic here
    try {
        const date = new Date();
        date.setUTCHours(0, 0, 0, 0);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Note: getMonth() returns 0-based month
        const firstDayOfMonth = new Date(year, month - 1, 1); // Construct start of month
        const lastDayOfMonth = new Date(year, month, 0); // Construct end of month

        // Find all sales records within the current month
        const expensesRecords = await Sales.find({
            date: {
                $gte: firstDayOfMonth,
                $lte: lastDayOfMonth
            }
        });

        if (expensesRecords.length === 0) {
            return res.status(404).send({ error: "No sales records found for the specified year and month", year, month });
        }

        const expensesDetails = {};
        let totalExpenses = 0;

        expensesRecords.forEach(sale => {
            const category = sale.category; // Assuming category is available in salesDetails model
            const amount = sale.totalPrice;
            
            if (!expensesDetails[category]) {
                expensesDetails[category] = 0;
            }
            
            expensesDetails[category] += amount;
            totalExpenses += amount;
        });

        res.status(200).send({ status: "Monthly expenses details fetched", expensesDetails, totalExpenses });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error fetching details" });
    }

    const totalExpenses =calculateTotalExpenses ;/* Calculation result */
    return totalExpenses;
};

module.exports = router;