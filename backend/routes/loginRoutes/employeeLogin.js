const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
let Manager = require("../../models/staffModels/managerDetails");

//register a new manager
router.route('/managerRegister').post(async (req, res) => {
    const empId = req.body.empId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
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

        const existingManager = await Manager.find({ firstName, lastName, designation });

        if (existingManager.length > 0) {
            return res.status(400).json({ error: "Manager already exists!" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newManager = await Manager.create({
            empId,
            firstName,
            lastName,
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

//manager login form
router.route('/managerLogin').post(async (req, res) => {
    const { designation, password } = req.body;

    try {
        const manager = await Manager.findOne({ designation });

        if (manager) {

            const match = await bcrypt.compare(password, manager.password);

            if (match) {
                const token = jwt.sign({ id: manager._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

                req.session.user = {
                    id: manager._id,
                    designation: manager.designation,
                    empID: manager.empID,
                };

                res.status(200).send({ status: "Login success", token, empID: manager.empID, designation: manager.designation });
            } else {
                res.status(401).send({ status: "Invalid password!" });
            }
        } else {
            res.status(404).send({ status: "Invalid designation!" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error!", error: error.message });
    }
});

module.exports = router;