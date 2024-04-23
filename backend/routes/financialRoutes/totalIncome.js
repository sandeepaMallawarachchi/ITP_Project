const express = require('express');
const router = express.Router();
const income = require('../../models/financialModels/income');


    router.get("/getTotalIncome", async (req, res) => {
        try {
            // Fetch all delivery records
            const Inc = await income.find();
    
            if (Inc.length === 0) {
                return res.status(404).send({ error: "No records found" });
            }
    
            let totalIncome = 0;
    
            Inc.forEach(incom => {
                totalIncome += incom.amount; // Add each delivery's totalCost to the totalDelivery variable
            });
    
            res.status(200).send({ getTotalIncome: totalIncome });
    
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: "Error fetching total Income " });
        }
    });
    

module.exports = router;
