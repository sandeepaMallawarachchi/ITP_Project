const router = require("express").Router();
let Report = require("../models/report");

router.route("/add").post((req,res)=>{

    const vehicleType = req.body.vehicleType;
    const monthlyDistance = req.body.monthlyDistance;
    const amountOfFuel = req.body.amountOfFuel;
    const serviceCharge = req.body.serviceCharge;
    const totalCost = req.body.totalCost; 
    

    const newReport = new Report({

        vehicleType,
        monthlyDistance,
        amountOfFuel,
        serviceCharge,
        totalCost
       
    })

    newReport.save().then(()=>{
        res.json("Details Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{

    Report.find().then((report)=>{
       res.json(report)
}).catch((err)=>{
    console.log(err)

    })

 })

 router.route("/update/:id").put(async(req, res) => {
    let userId = req.params.id;
    const {vehicleType, monthlyDistance, amountOfFuel, serviceCharge, totalCost} = req.body;

    const updateReport = {
        vehicleType,
        monthlyDistance,
        amountOfFuel,
        serviceCharge,
        totalCost
        
    }

    const update = await Report.findByIdAndUpdate(userId, updateReport)
    .then(() => {
        res.status(200).send({status: "Details updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })

 })

 router.route("/deleteReport/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Report.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "Details deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete data", error: err.message});

    })
 })

 router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    const user = await Report.findById(userId)
    .then((report) => {
        res.status(200).send({status: "Details fetched", report});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get data", error: err.message});

    })
 })


module.exports = router;
