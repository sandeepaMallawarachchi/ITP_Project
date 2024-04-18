const router = require("express").Router();
const { response } = require("express");
let Vacation = require("../../models/staffModels/vacationDetails");

router.route("/add").post((req,res)=>{

    const date = req.body.date;
    const empName = req.body.empName;
    const title = req.body.title;
    const department = req.body.department;
    const daysEarned = req.body.daysEarned;
    const reqDate = req.body.reqDate;
    const returningDate = req.body.returningDate;
    const totDays = req.body.totDays;
    const approvalDate = req.body.totDays;

    const newVac = new Vacation({

        date,
        empName,
        title,
        department,
        daysEarned,
        reqDate,
        returningDate,
        totDays,
        approvalDate

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

router.route("/get/:empId").get(async (req, res) => {
    const empId = req.params.empId;
    const vac = await Vacation.find({ empId: empId }).then((vacation) => {
        res.status(200).send({ status: "User fetched", vacation });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with get employee", error: err.message });
    });
});

module.exports = router;