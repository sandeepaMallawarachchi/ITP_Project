const router = require("express").Router();
const financial = require("../model/financial");

router.route("/add").post(async (req, res) => {

    const date = req.body.date;
    const category = req.body.category;
    const description = req.body.description;
    const amount = Number(req.body.amount);

    const newExpen = new financial({
        date,
        category,
        description,
        amount
    })

    newExpen.save().then(() => {
        res.json("Expenses Added")
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/display").get((req, res) => {
    //body
    financial.find().then((expenses) => {
        res.json(expenses)
    }).catch((err) => {
        console.log(err)
    })


})
router.route("/update/:id").put(async (req, res) => {
    let UserId = req.params.id;
    const { date,
        category,
        description,
        amount } = req.body;
    const updateExpenses = {
        date,
        category,
        description,
        amount
    }
    const update = await financial.findByIdAndUpdate(UserId, updateExpenses).then(() => {
        res.status(200).send({ status: "expenses updated" })

    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data" });
    })
});

router.route("/delete/:id").delete(async (req, res) => {
    let UserId = req.params.id;

    await financial.findByIdAndDelete(UserId).then(() => {
        res.status(200).send({ status: "User deleted." });
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete.", error: err.message });
    })

})

router.route("/get/:id").get(async (req, res) => {
    try {
      const userId = req.params.id;
      const expense = await financial.findById(userId);

      res.status(200).json({ status: "Expense fetched", expense });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ status: "Error with fetch", error: error.message });
    }
  });
  
module.exports = router;