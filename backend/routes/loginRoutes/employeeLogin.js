const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
let Staff = require("../../models/staffModels/staffDetails");

//manager login form
router.route('/managerLogin').post(async (req, res) => {
    const { email, designation } = req.body;

    try {
        const manager = await Staff.findOne({ email });

        if (manager) {

            if (manager.designation === designation) {
                const token = jwt.sign({ id: manager._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

                req.session.user = {
                    id: manager._id,
                    email: manager.email,
                    designation: manager.designation,
                    empID: manager.empID,
                };

                res.status(200).send({ status: "Login success", token, empID: manager.empID, designation: manager.designation });
            } else {
                res.status(401).send({ status: "Invalid designation!" });
            }
        } else {
            res.status(404).send({ status: "Invalid email!" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: "Error!", error: error.message });
    }
});

module.exports = router;