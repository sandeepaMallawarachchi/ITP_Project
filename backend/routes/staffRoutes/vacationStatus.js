const router = require("express").Router();
const { response } = require("express");
let VacationStatus = require("../../models/staffModels/vacationStatus");

router.route("/add").post((req, res) => {

    const date = req.body.date;
    const empName = req.body.empName;
    const title = req.body.title;
    const department = req.body.department;
    const daysEarned = req.body.daysEarned;
    const reqDate = req.body.reqDate;
    const returningDate = req.body.returningDate;
    const totDays = req.body.totDays;
    const status = req.body.status;
    const statusDate = req.body.statusDate;

    const newVacStatus = new VacationStatus({

        date,
        empName,
        title,
        department,
        daysEarned,
        reqDate,
        returningDate,
        totDays,
        status,
        statusDate,

    })

    newVacStatus.save().then(() => {
        res.json("Vacation Status Updated",newVacStatus)
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/vacationReport").get(async (req, res) => {

    try {
        const vacationStatus = await VacationStatus.find();
        res.status(200).send({ status: "User fetched", vacationStatus });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error with update status", error: error.message });
    }

})

router.route("/get/:empId").get(async (req, res) => {
    const empId = req.params.empId;
    const vac = await VacationStatus.find({ empId: empId }).then((vacationStatus) => {
        res.status(200).send({ status: "User fetched", vacation });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with update status", error: err.message });
    });
});

module.exports = router;