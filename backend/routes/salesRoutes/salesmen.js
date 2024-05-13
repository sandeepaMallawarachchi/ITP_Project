const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
let Salesmen = require("../../models/salesmenModels/salesmenDetails");
let ProfilePicture = require("../../models/salesmenModels/profilePictureDetails");

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


router.route("/updateSalesmen/:salespersonID").put(async (req, res) => {
    let salespersonID = req.params.salespersonID;
    const { name, username, dateOfBirth, email, phone, address } = req.body;

    const updateSalesmen = {
        name,
        username,
        dateOfBirth,
        email,
        phone: Number(phone),
        address,
    };

    try {
  
        await Salesmen.findOne({ salespersonID });

        await Salesmen.findOneAndUpdate({ salespersonID }, updateSalesmen);

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

//forget password
router.route("/forgetPassword").post(async (req, res) => {

    let { usernameOrPhone } = req.body;
    const isPhone = !isNaN(usernameOrPhone);
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

        let salesPerson;
        if (isPhone) {
            salesPerson = await Salesmen.findOne({ phone: usernameOrPhone });
        } else {
            salesPerson = await Salesmen.findOne({ username: usernameOrPhone });
        }

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

//upload profile picture
router.route("/uploadProfilePicture").post(async (req, res) => {

    const { imageURL, salespersonID } = req.body;

    if (!imageURL) {
        res.status(400).send({ status: "Image url not found" });
    }

    try {

        let profilePicture = await ProfilePicture.findOne({ salespersonID });

        if (profilePicture) {

            profilePicture.imageURL = imageURL;
            await profilePicture.save();
        } else {

            profilePicture = await ProfilePicture.create({ imageURL, salespersonID });
        }

        res.status(200).send({ status: "image uploaded successfully", profilePicture });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error uploading image" });
    }
});

//download monthly report
router.route("/changeProfilePicture/:salespersonID").get(async (req, res) => {

    const { salespersonID } = req.params;
    try {

        const image = await ProfilePicture.findOne({ salespersonID: salespersonID });

        if (!image) {
            return res.status(404).send({ status: "Image not found" });
        }

        res.status(200).send({ status: "image fetched successfully", image });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error fetching image" });
    }
});

module.exports = router;