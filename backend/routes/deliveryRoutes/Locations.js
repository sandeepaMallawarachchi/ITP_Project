const router = require("express").Router();
let Tea = require("../../models/deliveryModels/location");

router.route("/add").post(async (req, res) => {
    const { name, cusID, email, phone_number, address, district, delivery_code } = req.body;

    // Regular expression to check for special characters
    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;

    // Check if name contains special characters
    if (specialCharsRegex.test(name)) {
        return res.status(400).json({ message: 'Customer name cannot contain special characters' });
    }

    try {
        // Check if a record with the same cusID already exists
        const existingRecord = await Tea.findOne({ cusID });

        if (existingRecord) {
            return res.status(400).json({ message: 'A record with this cusID already exists' });
        }

        // If no duplicate record found and name doesn't contain special characters, proceed to add the new record
        const newTea = new Tea({
            name,
            cusID,
            email,
            phone_number,
            address,
            district,
            delivery_code
        });

        await newTea.save();
        res.json("Location added");
    } catch (err) {
        console.error("Error adding record:", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});




module.exports = router;


router.route("/").get((req, res) => {

    Tea.find().then((tea) => {
        res.json(tea)
    }).catch((err) => {
        console.log(err)

    })
})

router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { name, email, phone_number, address, district, delivery_code } = req.body;

    const updateTea = {
        name,
        email,
        phone_number,
        address,
        district,
        delivery_code
    }

    const update = await Tea.findByIdAndUpdate(userId, updateTea)
        .then(() => {
            res.status(200).send({ status: "User updated" })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data" });
        })

})

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await Tea.findByIdAndDelete(userId)
        .then(() => {
            res.status(200).send({ status: "User deleted" });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete user", error: err.message });

        })
})

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;

    const user = await Tea.findById(userId)
        .then((tea) => {
            res.status(200).send({ status: "User fetched", tea });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get user", error: err.message });

        })
})

router.route("/getCustomerLocation").get(async (req, res) => {
    let cusID = req.body;

    await Tea.findOne(cusID)
        .then((location) => {
            res.status(200).send({ status: "User fetched", location });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get user", error: err.message });

        })
})

module.exports = router;