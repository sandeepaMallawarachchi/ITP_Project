const express = require('express');
const router = express.Router();
const Salary = require('../../models/staffModels/salaryDetails');

router.get("/totalSalary", async (req, res) => {
    try {
        
        // Fetch all salary records
        const salaries = await Salary.find();

        if (salaries.length === 0) {
            return res.status(404).send({ error: "No salary records found" });
        }

        let totalSalary = 0;

        salaries.forEach(salary => {
            totalSalary += salary.netSalary;
        });

        res.status(200).send({ totalSalary });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error fetching total salary" });
    }
});

module.exports = router;
