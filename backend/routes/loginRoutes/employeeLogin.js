const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
let Manager = require("../../models/staffModels/managerDetails");
let Salesmen = require("../../models/salesmenModels/salesmenDetails");

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

        res.json({ status: "Manager added", manager: newManager });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error!", error: error.message });
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

            return res.status(200).json({ status: "Login success", token, empID: manager.empID, username: manager.username, designation: manager.designation });
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

module.exports = router;