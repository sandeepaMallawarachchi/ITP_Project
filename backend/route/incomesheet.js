const router=require ("express").Router();
const Income = require("../model/income");

// Add income route
router.route("/addIncome").post(async (req, res) => {
  try {
    const { date, category, description, amount } = req.body;

    const newIncome = new Income({
      date,
      category,
      description,
      amount
    });

    await newIncome.save();
    res.json("Income Added");
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Error adding income" });
  }
});

router.route("/displayIncome").get((req,res)=>{
    //body
    Income.find().then((incomeRt)=>{
        res.json(incomeRt)
    }).catch((err)=>{
        console.log(err)
    })


})
router.route("/update/:id").put(async(req,res)=>{
    let UserId=req.params.id;
    const { date,
        category,
        description,
        amount}=req.body;
    const updateIncome={
        date,
        category,
        description,
        amount
    }
    const update=await Income.findByIdAndUpdate(UserId,updateIncome).then(()=>{
        res.status(200).send({status:"income updated"})
    
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data"});
    })
});

router.route("/delete/:id").delete(async(req,res)=>{
    let UserId=req.params.id;

    await Income.findByIdAndDelete(UserId).then(()=>{
        res.status(200).send({status : "income deleted."});
    }).catch((err)=>{
    console.log(err.message);
    res.status(500).send({status: "Error with delete.",error:err.message});
    })

})


router.route("/get/:id").get(async (req, res) => {
    let UserId = req.params.id;
    try {
        const incomeDetails = await Income.findById(UserId);
        if (!incomeDetails) {
            return res.status(404).send({ status: "Error", error: "Income details not found" });
        }
        res.status(200).send({ status: "Income fetched", income: incomeDetails });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error", error: err.message });
    }
});

module.exports=router;