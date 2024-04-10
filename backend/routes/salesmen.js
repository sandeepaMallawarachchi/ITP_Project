const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
let Salesmen = require("../models/salesmenModels/salesmenDetails");

//register as a new salesmen
router.route('/salesmenRegister').post(async (req, res) => {
    const salespersonID = req.body.salespersonID;
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const dateOfBirth = req.body.dateOfBirth;
    const gender = req.body.gender;
    const email = req.body.email;
    const phone = Number(req.body.phone);
    const address = req.body.address;

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Password validation
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingUsername = await Salesmen.find({ username });

        if (existingUsername.length > 0) {
            return res.status(400).json({ error: "Username already exists!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newSalesmen = await Salesmen.create({
            salespersonID,
            name,
            username,
            password: hashedPassword,
            dateOfBirth,
            gender,
            email,
            phone,
            address,
        });

        res.json({ status: "Salesmen added", salesmen: newSalesmen });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error!", error: error.message });
    }
});

//dashboard details
router.route("/salesmenDashboard/:id").get(async (req, res) => {
    let salespersonID = req.params.id;

    try {
        let salesman = await Salesmen.findOne({ salespersonID: salespersonID });
        if (!salesman) {
            return res.status(404).send({ status: "Error!", message: "Salesman not found." });
        }
        res.status(200).send({ status: "Salesman fetched", salesman });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error!", error: error.message });
    }
});


//update salesmen details
router.route("/updateSalesmen/:salespersonID").put(async (req, res) => {

    let salespersonID = req.params.salespersonID;
    const name = req.body.name;
    const username = req.body.username;
    const dateOfBirth = req.body.dateOfBirth;
    const gender = req.body.gender;
    const email = req.body.email;
    const phone = Number(req.body.phone);
    const address = req.body.address;
    const updateSalesmen = {
        name,
        username,
        dateOfBirth,
        gender,
        email,
        phone,
        address,
    }

    try {
        const update = await Salesmen.findOneAndUpdate(salespersonID, updateSalesmen);
        res.json({ status: "User updated" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error!", error: error.message });
    }
});

//delete salesmen
router.route("/deleteSalesmen/:id").delete(async (req, res) => {

    let userId = req.params.id;

    try {

        await Salesmen.findByIdAndDelete(userId);
        res.status(200).send({ status: "User deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error!", error: error.message });
    }
});

//change password
router.route("/changePassword/:id").put(async (req, res) => {

    let userId = req.params.id;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    // Password validation
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password in the database
        await Salesmen.findByIdAndUpdate(userId, { password: hashedPassword });

        res.status(200).send({ status: "Password changed" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error!", error: error.message });
    }
});

module.exports = router;