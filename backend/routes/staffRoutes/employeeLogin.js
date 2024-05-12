const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
let Manager = require("../../models/staffModels/managerDetails");
let Salesmen = require("../../models/salesmenModels/salesmenDetails");
let EmployeeProfilePicture = require("../../models/staffModels/profilePictureDetails");

//register a new manager
router.route('/managerRegister').post(async (req, res) => {
    const empId = req.body.empId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const gender = req.body.gender;
    const department = req.body.department;
    const designation = req.body.designation;
    const address = req.body.address;
    const email = req.body.email;
    const phoneNo = req.body.phoneNo;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const dateOfBirth = req.body.dateOfBirth;

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Password validation
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingManager = await Manager.find({ username, designation });

        if (existingManager.length > 0) {
            return res.status(400).json({ error: "Manager already exists!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newManager = await Manager.create({
            empId,
            firstName,
            lastName,
            username,
            password: hashedPassword,
            gender,
            department,
            designation,
            address,
            email,
            phoneNo,
            dateOfBirth,
        });

        // Create a transporter object
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.REGISTRATION_EMAIL,
                pass: process.env.REGISTRATION_PASSWORD
            }
        });

        const resetPasswordLink = `http://localhost:3000`;
        const mailOptions = {
            from: process.env.REGISTRATION_EMAIL,
            to: email,
            subject: 'Hendriks Tea User Registration',
            text: `You are receiving this email because you have registered to Hendriks Tea.\n\nPlease click on the following link, or paste this into your browser to login to your account:\n\n${resetPasswordLink}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).send({ status: "Error!", error: "Failed to send email" });
            } else {
                console.log("Registration email sent: " + info.response);
                return res.status(200).send({ status: "Success", message: "Email sent successfully" });
            }
        });

        res.json({ status: "Manager added", manager: newManager });
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

//registration email
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

//employee login form
router.route('/employeeLogin').post(async (req, res) => {
    const { usernameOrPhone, password } = req.body;

    try {
        const isPhone = !isNaN(usernameOrPhone);

        let staff;

        if (isPhone) {
            staff = await Salesmen.findOne({ phone: usernameOrPhone });
        } else {
            staff = await Salesmen.findOne({ username: usernameOrPhone });
        }

        if (!staff) {
            const manager = await Manager.findOne({ username: usernameOrPhone });

            if (!manager) {
                return res.status(404).json({ status: "Invalid username or phone!" });
            }

            const match = await bcrypt.compare(password, manager.password);

            if (!match) {
                return res.status(401).json({ status: "Invalid password!" });
            }

            const token = jwt.sign({ id: manager._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

            req.session.user = {
                id: manager._id,
                username: manager.username,
                empID: manager.empID,
            };

            return res.status(200).json({ status: "Login success", token, empId: manager.empId, username: manager.username, designation: manager.designation });
        }

        const match = await bcrypt.compare(password, staff.password);

        if (!match) {
            return res.status(401).json({ status: "Invalid password!" });
        }

        const token = jwt.sign({ id: staff._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        req.session.user = {
            id: staff._id,
            username: staff.username,
            role: staff.role,
            salespersonID: staff.salespersonID,
        };

        res.status(200).json({ status: "Login success", token, salespersonID: staff.salespersonID, role: staff.role });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ status: "Error!", error: error.message });
    }
});

// Middleware to check session status
router.use((req, res, next) => {
    if (!req.session.user) {
        console.log("Session expired or invalid. User needs to log in again.");

        req.session.destroy((err) => {
            if (err) {
                console.log("Error destroying session:", err);
            }
        });
    }
    next();
});

//logout
router.route("/logout").get(async (req, res) => {
    try {

        req.session = null;
        res.status(200).send({ status: "Logged out successfully" });
    } catch (error) {
        console.log("Error logging out:", error);
        res.status(500).send({ status: "Error logging out", error: error.message });
    }
});

//get manager by id
router.route("/getManager/:empId").get(async (req, res) => {

    let empId = req.params.empId;

    try {
        let manager = await Manager.findOne({ empId: empId });
        if (!manager) {
            return res.status(404).send({ status: "Error!", message: "manager not found." });
        }
        res.status(200).send({ status: "manager fetched", manager });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error!", error: error.message });
    }
});

//get all managers
router.route("/getManagers").get(async (req, res) => {

    try {
        const employeeRecords = await Manager.find();
        if (employeeRecords.length === 0) {
            return res.status(404).send({ status: "Error!", message: "managers not found." });
        }
        // res.status(200).send({ status: "managers fetched", manager });

        const departmentDetails = [];

        for (const employee of employeeRecords) {

            const department = employee.department;
            let totalEmployees = 0;

            const existingDepartment = departmentDetails.find(item => item.department === department);

            if (!existingDepartment) {
                departmentDetails.push({
                    department,
                    empId: employee.empId
                });
            } else {
                existingDepartment.empId += employee.empId;
            }
        }
        res.status(200).send({ status: "Total employees for a department", departmentDetails });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error!", error: error.message });
    }
});

//update manager details
router.route("/updateManager/:empId").put(async (req, res) => {

    let empId = req.params.empId;
    const { firstName, lastName, gender, department, designation, address, email, phoneNo } = req.body;
    const updateManager = {
        firstName,
        lastName,
        gender,
        department,
        designation,
        address,
        email,
        phoneNo,
    }

    try {
        await Manager.findOneAndUpdate(empId, updateManager);
        res.json({ status: "User updated", update: updateManager });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error!", error: error.message });
    }
});

//delete
router.delete("/delete/:empId", async (req, res) => {
    const empId = req.params.empId;

    try {
        const deleted = await Manager.findOneAndDelete({ empId: empId });
        if (!deleted) {
            return res.status(404).send({ status: "Employee not found" });
        }
        res.status(200).send({ status: "Employee Deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete employee", error: err.message });
    }
});

//upload profile picture
router.route("/uploadProfilePicture").post(async (req, res) => {

    const { imageURL, empId } = req.body;

    if (!imageURL) {
        res.status(400).send({ status: "Image url not found" });
    }

    try {

        let profilePicture = await EmployeeProfilePicture.findOne({ empId });

        if (profilePicture) {

            profilePicture.imageURL = imageURL;
            await profilePicture.save();
        } else {

            profilePicture = await EmployeeProfilePicture.create({ imageURL, empId });
        }

        res.status(200).send({ status: "image uploaded successfully", profilePicture });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error uploading image" });
    }
});

//download monthly report
router.route("/changeProfilePicture/:empId").get(async (req, res) => {

    const { empId } = req.params;
    try {

        const image = await EmployeeProfilePicture.findOne({ empId: empId });

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