const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
let Salesmen = require("../models/salesmenModels/salesmenDetails");
let Bulk = require("../models/salesModels/bulkManagement");

//register as a new salesmen
router.route('/salesmenRegister').post(async (req, res) => {
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
            name,
            username,
            password: hashedPassword,
            confirmPassword: hashedPassword,
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

//update salesmen details
router.route("/updateSalesmen/:id").put(async (req, res) => {

    let userId = req.params.id;
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
        const update = await Salesmen.findByIdAndUpdate(userId, updateSalesmen);
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
router.route("/resetPassword/:id").put(async (req, res) => {

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
        await Salesmen.findByIdAndUpdate(userId, { password: hashedPassword, confirmPassword: hashedPassword });

        res.status(200).send({ status: "Password changed" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error!", error: error.message });
    }
});

//search bulk
router.route("/searchBulk").get(async (req, res) => {

    const teaType = req.body.teaType;
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);

    try {

        // Find the remaining tea bulk
        const remainingbulk = await Bulk.findOne({ teaType: teaType, date: date });

        if (remainingbulk) {
            totalBulk = remainingbulk.totalBulk;
            res.status(200).send({ status: `${teaType} is available`, totalBulk });
        } else {
            res.status(404).send({ status: `Reamainig bulk of ${teaType} is not found!` });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error!", error: error.message });
    }
});

module.exports = router;