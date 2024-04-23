const express = require('express');
const router = express.Router();
const Delivery = require('../../models/deliveryModels/report');
let Report = require("../../models/deliveryModels/report");


// router.get("/totalDelivery", async (req, res) => {
//     try {

//         const year = parseInt(req.params.year);
//         const month = parseInt(req.params.month);

//         // Calculate start and end dates for the specified month
//     const startDate = new Date(year, month - 1, 1); // Month is 0-indexed
//     const endDate = new Date(year, month, 0); // Last day of the month





//           // Fetch delivery records for the specified month
//     const deliveries = await Delivery.find({
//         createdAt: {
//             $gte: startDate,
//             $lte: endDate
//         }
//     });

//         if (deliveries.length === 0) {
//             return res.status(404).send({ error: "No delivery records found" });
//         }

//         let totalDelivery = 0;

//         deliveries.forEach(delivery => {
//             totalDelivery += delivery.totalCost; // Add each delivery's totalCost to the totalDelivery variable
//         });

//         res.status(200).send({ totalDelivery });

//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ error: "Error fetching total delivery cost" });
//     }
// });


module.exports = router;
