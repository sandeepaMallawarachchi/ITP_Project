const express = require('express');
const router = express.Router();
const Teamodel = require('../../models/supplierModels/teadetail');


router.get("/totalPrice", async (req, res) => {
    try {
        const totalPriceAggregate = await Teamodel.aggregate([
            {
                $group: {
                    _id: null,
                    totalPrice: { $sum: "$price" } // Sum all the price values
                }
            }
        ]);

        if (totalPriceAggregate.length === 0) {
            return res.status(404).send({ error: "No records found" });
        }

        const total = totalPriceAggregate[0].totalPrice;

        res.status(200).send({ total });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error fetching total price" });
    }
});

    

module.exports = router;