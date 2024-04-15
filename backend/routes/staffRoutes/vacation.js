const router = require("express").Router();
const { response } = require("express");
let Vacation = require("../models/vacationDetails");

router.route("/add").post((req,res)=>{

    const date = req.body.date;
    const empName = req.body.empName;
    const title = req.body.title;
    const department = req.body.department;
    const daysEarned = req.body.daysEarned;
    const reqDate = req.body.reqDate;
    const returningDate = req.body.returningDate;
    const totDays = req.body.totDays;

    const newEmp = new Vacation({

        date,
        empName,
        title,
        department,
        daysEarned,
        reqDate,
        returningDate,
        totDays

    })

    newVac.save().then(()=>{
       res.json("Vacation Added") 
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/allVacations").get((req,res)=>{

    Vacation.find().then((vacation)=>{
        res.json(staff)
    }).catch((err)=>{
        console.log(err)
    })

})

// router.route("/update/:id").put(async (req, res)=>{
//     let id = req.params.id;
//     const {empId,firstName,lastName,gender,department,designation,address,email,phoneNo} = req.body;
    
//     const updateStaffDetails = {
//         empId,
//         firstName,
//         lastName,
//         gender,
//         department,
//         designation,
//         address,
//         email,
//         phoneNo
//     }

//     const update = await Staff.findByIdAndUpdate(id,updateStaffDetails).then(()=>{
//         res.status(200).send({status: "Employee Updated"})
//     }).catch((err)=>{
//         console.log(err);
//         res.status(500).send({status: "Error with updating data",error: err.message});
//     })  
// })

// router.route("/delete/:id").delete(async(req,res)=>{
//     let id = req.params.id;

//     await Staff.findByIdAndDelete(id).then(()=>{
//         res.status(200).send({status: "Employee Deleted"});
//     }).catch((err)=>{
//         console.log(err.message);
//         res.status(500).send({status: "Error with delete employee",error: err.message});
//     })

// })

router.route("/get/:empId").get(async (req, res) => {
    const empId = req.params.empId;
    const emp = await Staff.find({ empId: empId }).then((staff) => {
        res.status(200).send({ status: "User fetched", staff });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with get employee", error: err.message });
    });
});

module.exports = router;