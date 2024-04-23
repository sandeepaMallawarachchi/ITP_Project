const router = require("express").Router();
let Tea = require("../../models/deliveryModels/location");

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const cusID = req.body.cusID;
    const email = req.body.email;
    const phone_number = req.body.phone_number; // Ensure phone_number is parsed to Number
    const address = req.body.address;
    const district = req.body.district;
    const delivery_code = req.body.delivery_code;

    const newTea = new Tea({
        name,
        cusID,
        email,
        phone_number,
        address,
        district,
        delivery_code
    });

    newTea.save()
        .then(() => {
            res.json("location Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json('Error: ' + err);
        });
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