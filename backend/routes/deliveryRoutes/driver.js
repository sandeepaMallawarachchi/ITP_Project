const router = require("express").Router();
let Driver = require("../../models/deliveryModels/driver");
let DriverLicense = require("../../models/deliveryModels/license");
let VehicleLicense = require("../../models/deliveryModels/vehiclelicense");
let VehicleEmission = require("../../models/deliveryModels/vehicleEmission");


router.route("/add").post(async (req, res) => {
    try {
        const { dname, dID, age, address, phone_number, email, duration_of_job } = req.body;

        // Check if the dID already exists in the database
        const existingDriver = await Driver.findOne({ dID });

        if (existingDriver) {
            return res.status(400).json({ error: "Driver with this ID already exists" });
        }

        const newDriver = new Driver({
            dname,
            dID,
            age,
            address,
            phone_number,
            email,
            duration_of_job,
        });

        await newDriver.save();

        res.json("Driver Added");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});



router.route("/").get((req, res) => {

    Driver.find().then((driver) => {
        res.json(driver)
    }).catch((err) => {
        console.log(err)

    })

})

router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { dname, dID, age, address, phone_number, email, duration_of_job } = req.body;

    const updateDriver = {
        dname,
        dID,
        age,
        address,
        phone_number,
        email,
        duration_of_job
    }

    const update = await Driver.findByIdAndUpdate(userId, updateDriver)
        .then(() => {
            res.status(200).send({ status: "Driver updated" })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data" });
        })

})

router.route("/deleteDriver/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Driver.findByIdAndDelete(userId)
        .then(() => {
            res.status(200).send({ status: "User deleted" });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete user", error: err.message });

        })
})

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    const user = await Driver.findById(userId)
        .then((driver) => {
            res.status(200).send({ status: "Driver fetched", driver });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get user", error: err.message });

        })
})

//upload driver license
router.route("/uploadLicense").post(async (req, res) => {

    const { downloadURL } = req.body;

    if (!downloadURL) {
        res.status(400).send({ status: "File url not found" });
    }

    try {

        const license = await DriverLicense.create({ downloadURL });

        res.status(200).send({ status: "file uploaded successfully", license });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error uploading file" });
    }
});

//upload vehicle certificate
// router.route("/uploadVehicleLicense").post(async (req, res) => {
//     const { downloadUrl } = req.body; // Update field name

//     if (!downloadUrl) {
//         res.status(400).send({ status: "File url not found" });
//     }

//     try {
//         const license = await DriverLicense.create({ downloadUrl }); // Use correct model name

//         res.status(200).send({ status: "file uploaded successfully", license });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({ error: "Error uploading file" });
//     }
// });

//upload vehicle license
router.route("/uploadVehicleLicense").post(async (req, res) => {

    const { downloadURL } = req.body;

    if (!downloadURL) {
        res.status(400).send({ status: "File url not found" });
    }

    try {

        const license = await VehicleLicense.create({ downloadURL });

        res.status(200).send({ status: "file uploaded successfully", license });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error uploading file" });
    }
});

//upload vehicle emission test
router.route("/uploadVehicleEmssion").post(async (req, res) => {

    const { downloadURL } = req.body;

    if (!downloadURL) {
        res.status(400).send({ status: "File url not found" });
    }

    try {

        const emission = await VehicleEmission.create({ downloadURL });

        res.status(200).send({ status: "file uploaded successfully", emission });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "Error uploading file" });
    }
});

module.exports = router;