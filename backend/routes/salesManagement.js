const router = require("express").Router();
let Sales = require("../models/salesModels/salesDetails");
let Prices = require("../models/salesModels/priceDetails");
// let Summary = require("../models/salesModels/summary");
let Bulk = require("../models/salesModels/bulkManagement");
let Discount = require("../models/salesModels/discounts");

//add a new employee
router.route("/setStandardPrice").post(async (req, res) => {

    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;

    try {
        if (!req.file) {
            return res.status(400).json({ error: "Image is required" });
        }

        // Save the employee information to MongoDB
        const newEmployee = await Employee.create({
            name,
            password,
            email,
            phone,
            address,
            image: req.file.filename,
        });

        res.json({ status: "Employee added", employee: newEmployee });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Error adding employee" });
    }

});