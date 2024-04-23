const express = require('express');
const router = express.Router();
const Delivery = require('../../models/deliveryModels/report');


    router.get("/totalDelivery", async (req, res) => {
        try {
            // Fetch all delivery records
            const deliveries = await Delivery.find();
    
            if (deliveries.length === 0) {
                return res.status(404).send({ error: "No delivery records found" });
            }
    
            let totalDelivery = 0;
    
            deliveries.forEach(delivery => {
                totalDelivery += delivery.totalCost; // Add each delivery's totalCost to the totalDelivery variable
            });
    
            res.status(200).send({ totalDelivery });
    
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: "Error fetching total delivery cost" });
        }
    });
    

module.exports = router;
