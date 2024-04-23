const express = require('express');
const router = express.Router();
const ex = require('../../models/financialModels/financial');


    router.get("/getTotalExpenses", async (req, res) => {
        try {
            // Fetch all delivery records
            const exepen = await ex.find();
    
            if (exepen.length === 0) {
                return res.status(404).send({ error: "No records found" });
            }
    
            let totalExpenses = 0;
    
            exepen.forEach(expenses => {
                totalExpenses += expenses.amount; // Add each delivery's totalCost to the totalDelivery variable
            });
    
            res.status(200).send({ getTotalExpenses: totalExpenses });
    
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: "Error fetching total delivery cost" });
        }
    });
    

module.exports = router;
