const router=require ("express").Router();
const financial=require("../model/financial");

router.route("/add").post(async(req,res)=>{

    const expenseType=req.body.expenseType;
    const value=Number(req.body.value);

    const newExpen = new financial({
        month,
        expenseType,
        value
    })

    newExpen.save().then(()=>{
        res.json("Expenses Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/display").get((req,res)=>{
    //body
    financial.find().then((expenses)=>{
        res.json(expenses)
    }).catch((err)=>{
        console.log(err)
    })


})
router.route("/update/:id").put(async(req,res)=>{
    let UserId=req.params.id;
    const {expenseType,value}=req.body;
    const updateExpenses={
        month,
        expenseType,
        value
    }
    const update=await financial.findByIdAndUpdate(UserId,updateExpenses).then(()=>{
        res.status(200).send({status:"expenses updated"})
    
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data"});
    })
});

router.route("/delete").delete(async(req,res)=>{
    let UserId=req.params.id;

    await financial.findByIdAndDelete(UserId).then(()=>{
        res.status(200).send({status : "User deleted."});
    }).catch((err)=>{
    console.log(err.message);
    res.status(500).send({status: "Error with delete.",error:err.message});
    })

})


router.route("/get/:id").get(async(req,res)=>{
    let UserId=req.params.id;
    const expense=await financial.findById(UserId).then(()=>{
        res.status(200).send({status : "expense fetched.",expense:expense});
    }).catch((err)=>{
    console.log(err.message);
    res.status(500).send({status: "Error with delete.",error:err.message});
    })


})
module.exports=router;