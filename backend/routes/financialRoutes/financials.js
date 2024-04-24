const router=require ("express").Router();
const financial = require("../../models/financialModels/financial");


// Add expenses route
router.route("/add").post(async (req, res) => {
    try {
      const { date, category, description, amount } = req.body;
        

      // Validate date: Check if the entered date is not a future date
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
      if (date > currentDate) {
          return res.status(400).json({ error: "Selected date cannot be a future date." });
      }


     // Validate amount: Check if amount is a positive number
     if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: "Enter a positive number for the amount." });
    }


      const newExpen = new financial({
        date,
        category,
        description,
        amount
      });
  
      await newExpen.save();
      res.json("Expenses Added");
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Error adding Expenses" });
    }
  });
  
router.route("/display").get(async (req, res) => {
    try {
        const expenses = await financial.find();
        res.json(expenses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error fetching expenses" });
    }
});
  router.route("/update/:id").put(async(req,res)=>{
      let UserId=req.params.id;
      const { date,
          category,
          description,
          amount}=req.body;
      const updateEx={
          date,
          category,
          description,
          amount
      }
      const update=await financial.findByIdAndUpdate(UserId,updateEx).then(()=>{
          res.status(200).send({status:" Expenses updated"})
      
      }).catch((err)=>{
          console.log(err);
          res.status(500).send({status:"Error with updating data"});
      })
  });
  
  router.route("/delete/:id").delete(async(req,res)=>{
      let UserId=req.params.id;
  
      await financial.findByIdAndDelete(UserId).then(()=>{
          res.status(200).send({status : "Expenses deleted."});
      }).catch((err)=>{
      console.log(err.message);
      res.status(500).send({status: "Error with delete.",error:err.message});
      })
  
  })
  
  
  router.route("/get/:id").get(async (req, res) => {
      let UserId = req.params.id;
      try {
          const expensesDetails = await financial.findById(UserId);
          if (!expensesDetails) {
              return res.status(404).send({ status: "Error", error: "Income details not found" });
          }
          res.status(200).send({ status: "Income fetched", financial: expensesDetails });
      } catch (err) {
          console.log(err.message);
          res.status(500).send({ status: "Error", error: err.message });
      }
  });

  
  
  
  
  module.exports=router;