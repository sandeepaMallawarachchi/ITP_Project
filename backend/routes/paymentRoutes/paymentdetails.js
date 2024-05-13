const router = require("express").Router();
let PaymentDetails = require("../../models/paymentModels/PaymentDetails");

router.route("/add").post((req,res) => {

    //Payment details
    const customerID = req.body.customerID;
    const customerName = req.body.customerName;
    const totalamount = req.body.totalamount;
    const payamount = req.body.payamount;
    const creditamount = req.body.creditamount;
    const dateandtime = req.body.dateandtime;

    const newPaymentDetails = new PaymentDetails({
        //paymentID,
        customerID,
        customerName,
        totalamount,
        payamount,
        creditamount,
        dateandtime
    })

    newPaymentDetails.save().then(() => {
        res.json("Payment Details Added !");
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/:customerID").get((req,res) => {
    const customerID = req.params.customerID;

    PaymentDetails.find({customerID : customerID}).then((paymentdetails) => {
        res.json(paymentdetails);
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/get/:objectID").get((req,res) => {
    const objectID = req.params.objectID;

    PaymentDetails.find({_id : objectID}).then((paymentdetails) => {
        res.json(paymentdetails);
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/").get((req,res) => {
    PaymentDetails.find().then((paymentdetailss) => {
        res.json(paymentdetailss);
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/update/:objectid").put(async(req,res) => {
    let objectID = req.params.objectid;

    const payamount = req.body.payamount;
    const creditamount = req.body.creditamount;

    const updatePaymentDetails = {
        payamount,
        creditamount,
    }

    const update = await PaymentDetails.findByIdAndUpdate(objectID,updatePaymentDetails).then(() => {
        res.status(200).send({status:"PaymentDetails Updated !",user : update})
        res.json("Payment Details Added !");
    }).catch((err) => {
        console.log(err);
    })
    //const update = await 
})

//banned a customer
router.route("/ban/:customerID").put(async(req,res) => {
    let customerID = req.params.customerID;

    const bannedstatus = req.body.bannedstatus;

    const updateBannedStatus = {
        bannedstatus
    }

    const update = await PaymentDetails.updateMany({customerID},updateBannedStatus).then(() => {
        res.status(200).send({status:"Banned Status Updated !",user : update})
        res.json("Banned status Updated !");
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/delete/:objectid").delete(async (req,res) => {
    let objectID = req.params.objectid;

    await PaymentDetails.findByIdAndDelete(objectID).then(() => {
        res.status(200).send({status:"Payment Details deleted !"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with delete user !"});
    })
})

module.exports = router;