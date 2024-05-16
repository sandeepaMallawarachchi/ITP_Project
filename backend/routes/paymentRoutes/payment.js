const router = require("express").Router();
let Payment = require("../../models/paymentModels/Payment");
 
router.route("/add").post((req,res) => {

    //card details
    const cardnumber = req.body.cardnumber
    const cardholdername = req.body.cardholdername
    const CVV = req.body.CVV

    const newPayment = new Payment({
        cardnumber,
        cardholdername,
        CVV
    })
    
    //new payment
    newPayment.save().then(() => {
        res.json("Card Details Added !");
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/").get((req,res) => {
    Payment.find().then((paymentdetailss) => {
        res.json(paymentdetailss);
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router; 

