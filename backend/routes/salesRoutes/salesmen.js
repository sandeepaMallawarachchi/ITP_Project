const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
let Salesmen = require("../../models/salesmenModels/salesmenDetails");

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
router.route("/changePassword/:salespersonID").put(async (req, res) => {

    let salespersonID = req.params.salespersonID;
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
        await Salesmen.findOneAndUpdate(salespersonID, { password: hashedPassword });

        res.status(200).send({ status: "Password changed" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error!", error: error.message });
    }
});

//staff login form
router.route('/login').post(async (req, res) => {
    let { usernameOrPhone, password } = req.body;

    const isPhone = !isNaN(usernameOrPhone);

    try {
        let staff;
        if (isPhone) {
            staff = await Salesmen.findOne({ phone: usernameOrPhone });
        } else {
            staff = await Salesmen.findOne({ username: usernameOrPhone });
        }

        if (staff) {
            const match = await bcrypt.compare(password, staff.password);

            if (match) {
                const token = jwt.sign({ id: staff._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

                req.session.user = {
                    id: staff._id,
                    username: staff.username,
                    role: staff.role,
                    salespersonID: staff.salespersonID,
                    role: staff.role
                };

                res.status(200).send({ status: "Login success", token, salespersonID: staff.salespersonID, role: staff.role });
            } else {
                res.status(401).send({ status: "Invalid password!" });
            }
        } else {
            res.status(404).send({ status: "Invalid username or phone!" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error!", error: error.message });
    }
});

// Middleware to check session status
router.use((req, res, next) => {
    if (!req.session.user) {
        console.log("Session expired or invalid. User needs to log in again.");
    }
    next();
});

//forget password
router.route("/forgetPassword").post(async (req, res) => {

    const username = req.body.username;
    const email = req.body.email;

    // Create a transporter object
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    try {

        const salesPerson = await Salesmen.findOne({ username: username });

        if (!salesPerson) {
            return res.status(404).send({ status: "Error!", error: "Salesperson not found" });
        }

        const resetPasswordLink = `http://localhost:3000/changeSalesmanPassword/${salesPerson.salespersonID}`;
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: 'Reset Your Password',
            text: `You are receiving this email because you have requested to reset the password for your account.\n\nPlease click on the following link, or paste this into your browser to reset your password:\n\n${resetPasswordLink}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).send({ status: "Error!", error: "Failed to send reset password email" });
            } else {
                console.log("Reset password email sent: " + info.response);
                return res.status(200).send({ status: "Success", message: "Reset password email sent successfully" });
            }
        });

    } catch (error) {
        res.status(404).send({ status: "Error!", error: error.message });
    }
});

module.exports = router;