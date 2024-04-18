const router = require("express").Router();
let Salary = require("../../models/staffModels/salaryDetails");

router.route("/addSalary").post((req, res) => {

    const empId = req.body.empId;
    const name = req.body.name;
    const designation = req.body.designation;
    const month = req.body.month;
    const year = req.body.year;
    const basicSalary = req.body.basicSalary;
    const ETFbonus = req.body.ETFbonus;
    const EPFbonus = req.body.EPFbonus;

    const netBonus = Number(ETFbonus) + Number(EPFbonus);
    const netSalary = Number(basicSalary) + netBonus;

    const newSalary = new Salary({

        empId,
        name,
        designation,
        month,
        year,
        basicSalary,
        ETFbonus,
        EPFbonus,
        netBonus,
        netSalary
    })

    newSalary.save().then(() => {
        res.json({ status: "Employee Net Salary Added", salary: newSalary });
    }).catch((err) => {
        console.log(err);
    })

})

router.route("/salaryDetails/:empId/:month/:year").get(async (req, res) => {

    const empId = req.params.empId;
    const month = req.params.month;
    const year = req.params.year;

    try {
        const salary = await Salary.find({ empId: empId, month: month, year: year });
        res.json(salary);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Error fetching salary" });
    }
});

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
