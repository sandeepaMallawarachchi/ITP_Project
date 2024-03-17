const router = require("express").Router();
const { response } = require("express");
let Staff = require("../models/staffDetails");

router.route("/add").post((req,res)=>{

    const empId = req.body.empId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const department = req.body.department;
    const designation = req.body.designation;
    const address = req.body.address;
    const email = req.body.email;
    const phoneNo = req.body.phoneNo;

    const newEmp = new Staff({

        empId,
        firstName,
        lastName,
        gender,
        department,
        designation,
        address,
        email,
        phoneNo

    })

    newEmp.save().then(()=>{
       res.json("Staff Menmber Added") 
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/allEmployees").get((req,res)=>{

    Staff.find().then((staff)=>{
        res.json(staff)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:id").put(async (req, res)=>{
    let id = req.params.id;
    const {empId,firstName,lastName,gender,department,designation,address,email,phoneNo} = req.body;
    
    const updateStaffDetails = {
        empId,
        firstName,
        lastName,
        gender,
        department,
        designation,
        address,
        email,
        phoneNo
    }

    const update = await Staff.findByIdAndUpdate(id,updateStaffDetails).then(()=>{
        res.status(200).send({status: "Employee Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.message});
    })  
})

router.route("/delete/:id").delete(async(req,res)=>{
    let id = req.params.id;

    await Staff.findByIdAndDelete(id).then(()=>{
        res.status(200).send({status: "Employee Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete employee",error: err.message});
    })

})

router.route("/get/:id").get(async(req,res)=>{
    let id = req.params.id;
    const emp = await Staff.findById(id).then((staff)=>{
        res.status(200).send({status: "User fetched",staff})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get employee",error:err.message})
    })
})

module.exports = router;