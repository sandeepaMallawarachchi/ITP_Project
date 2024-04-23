const router = require("express").Router();
const { response } = require("express");
let Staff = require("../../models/staffModels/staffDetails");
let Manager = require("../../models/staffModels/managerDetails");

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
       res.json("Staff Member Added") 
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/allEmployees").get((req,res)=>{

    Manager.find().then((staff)=>{
        res.json(staff)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:empId").put(async (req, res)=>{
    let empId = req.params.empId;
    const {firstName,lastName,gender,department,designation,address,email,phoneNo} = req.body;
    
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

    const update = await Staff.findOneAndUpdate(empId,updateStaffDetails).then(()=>{
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

router.route("/get/:empId").get(async (req, res) => {
    const empId = req.params.empId;
    const emp = await Staff.findOne({ empId: empId }).then((staff) => {
        res.status(200).send({ status: "User fetched", staff });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with get employee", error: err.message });
    });
});

module.exports = router;
