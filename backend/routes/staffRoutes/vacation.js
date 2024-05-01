const router = require("express").Router();
const { response } = require("express");
let Vacation = require("../../models/staffModels/vacationDetails");

router.route("/add").post((req, res) => {

    const date = req.body.date;
    const empName = req.body.empName;
    const title = req.body.title;
    const department = req.body.department;
    const daysEarned = req.body.daysEarned;
    const reqDate = req.body.reqDate;
    const returningDate = req.body.returningDate;
    const totDays = req.body.totDays;

    const newVac = new Vacation({

        date,
        empName,
        title,
        department,
        daysEarned,
        reqDate,
        returningDate,
        totDays,

    })

    newVac.save().then(() => {
        res.json("Vacation Added")
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/allVacations").get(async (req, res) => {

    try {
        const vacation = await Vacation.find();
        res.status(200).send({ status: "User fetched", vacation });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error with get employee", error: error.message });
    }

})

router.route("/vacationDetails/:id").get(async (req, res) => {
    const { id } = req.params; 
    try {
        const vacation = await Vacation.findById(id); 
        if (vacation) {
            res.status(200).send({ status: "Vacation details fetched", vacation });
        } else {
            res.status(404).send({ status: "Not Found", message: "No vacation found with this ID" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: "Error fetching vacation", error: err.message });
    }
});


module.exports = router;