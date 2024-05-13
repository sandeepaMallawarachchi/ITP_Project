const router = require("express").Router();
let  PaymentAdmin = require("../../models/paymentModels/PaymentAdmin");

router.route("/add").post((req,res) => {

    //card details
    const ID = req.body.ID
    const password = req.body.password

    const newPaymentAdmin = new PaymentAdmin({
        ID,
        password
    })

    newPaymentAdmin.save().then(() => {
        res.json("Payment Admin Added !");
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/get").get((req,res) => {
    PaymentAdmin.find().then((paymentadmin) => {
        res.json(paymentadmin);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;