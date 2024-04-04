const router = require("express").Router();
let Driver = require("../models/driver");

router.route("/add").post((req,res)=>{

    const dname = req.body.dname;
    const age = req.body.age;
    const address = Number(req.body.address);
    const phone_number = req.body.phone_number;
    const email = req.body.email; 
    const duration_of_job = req.body.duration_of_job;

    const newDriver = new Driver({

        dname,
        age,
        address,
        phone_number,
        email,
        duration_of_job
    })

    newDriver.save().then(()=>{
        res.json("Driver Added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{

    Driver.find().then((driver)=>{
       res.json(driver)
}).catch((err)=>{
    console.log(err)

    })

 })

 router.route("/update/:id").put(async(req, res) => {
    let userId = req.params.id;
    const {dname, age, address, phone_number, email, duration_of_job} = req.body;

    const updateDriver = {
        dname,
        age,
        address,
        phone_number,
        email,
        duration_of_job
    }

    const update = await Driver.findByIdAndUpdate(userId, updateDriver)
    .then(() => {
        res.status(200).send({status: "Driver updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })

 })

 router.route("/deleteDriver/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Driver.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "User deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});

    })
 })

 router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    const user = await Driver.findById(userId)
    .then((driver) => {
        res.status(200).send({status: "Driver fetched", driver});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});

    })
 })


module.exports = router;
