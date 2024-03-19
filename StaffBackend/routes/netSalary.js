const router = require("express").Router();
const { response } = require("express");
let Salary = require("../models/SalaryDetails");

router.route("/addSalary").post((req, res) => {

    const empId = req.body.empId;
    const name = req.body.name;
    const designation = req.body.designation;
    const month = req.body.month;
    const basicSalary = req.body.basicSalary;
    const bonusType = req.body.bonusType;
    const netBonus = req.body.netBonus;
    const netSalary = req.body.netSalary;

    const newSalary = new Salary({

        empId,
        name,
        designation,
        month,
        basicSalary,
        bonusType,
        netBonus,
        netSalary

    })

    newSalary.save().then(() => {
        res.json({status: "Employee Net Salary Added", salary: newSalary});
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/allSalaries").get((req, res) => {

    Salary.find().then((netSalary) => {
        res.json(netSalary)
    }).catch((err) => {
        console.log(err)
    })

})

router.route("/get/:id").get(async (req, res) => {
    let id = req.params.id;
    const emp = await Salary.findById(id).then((netSalary) => {
        res.status(200).send({ status: "User fetched", netSalary })
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with get salary", error: err.message })
    })
})

module.exports = router;