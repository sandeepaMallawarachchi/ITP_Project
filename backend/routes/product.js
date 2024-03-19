const express = require("express");
const teaPack = require("../models/inventoryModels/product");
const mongoose = require("mongoose");
const router = express.Router();


//add a new tea pack 
router.post("/addTeaPack",async(req,res)=>{
    const {productName,teaType,stockLevel,unitPrice,weight,manDate,expDate,reorderLevel} = req.body; //destructuring
    
    //db query to insert new product 
    const newPack = new teaPack({productName,teaType,stockLevel,unitPrice,weight,manDate,expDate,reorderLevel,emailSent : false});
    
    await newPack.save()
    .then(()=>{
        res.status(200).json({msg : "Inserted successfully"});
    }).catch((err)=>{
        res.status(400).json({error : err.message})
    });
});

//get all tea packs
router.get("/getTeaPack",async(req,res)=>{
    //db query to get all tea products
    await teaPack.find().sort({createdAt : -1})
    .then((Teapacks)=>{
        res.status(200).json(Teapacks);
     }).catch((err)=>{
        res.status(400).json({error : err.message})
    });
});

//update tea packs
router.patch("/updateTeaPack/:id",async(req,res)=>{

    const {id} = req.params;
    const {productName,teaType,stockLevel,unitPrice,weight,manDate,expDate,reorderLevel} = req.body;
    
    //checking if the id is valid 
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg : "No such tea product"})
    }
    //updated tea product
    const updatePacket = {productName,teaType,stockLevel,unitPrice,weight,manDate,expDate,reorderLevel}

    await teaPack.findByIdAndUpdate(id,updatePacket)
    .then((updatePack)=>{
         res.status(200).json(updatePack);
    }).catch((err)=>{
         res.status(400).json({error : err.message})
    });
});

//delete tea pack
router.delete("/deleteTeaPack/:id",async(req,res)=>{
    const {id} = req.params;

     //checking if the id is valid 
     if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(400).json({msg : "No such tea product"})
    }
        //db query to update tea product details
     await teaPack.findByIdAndDelete(id)
        .then((deletePack)=>{
            res.status(200).json({msg : "packet deleted"});
        }).catch((err)=>{
            res.status(400).json({error : err.message})
        })
})
    
//retreive a single pack
router.get("/getPack/:id",async(req,res)=>{
    
    const {id} = req.params;

     //checking if the id is valid 
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({msg : "No such tea product"})
    }
    //db query to get a single product
    await teaPack.findById(id)
    .then((onePacket)=>{
        res.status(200).json(onePacket);
    }).catch((err)=>{
        res.status(400).json({error : err.message})
    });
 });

//search tea packs
router.get("/searchTeapack",async(req,res)=>{
    const query = req.query.q;
   
    try{
        //db query to search a product by its product code or tea type
        const searchPack = await teaPack.find({$or : [
                               {teaType : {$regex :query ,$options : "i"}},{productName :{$regex :query, $options : "i"}}]})
        if(searchPack){
            //console.log(searchPack)
          return res.status(200).json(searchPack)
        }else{
           return res.status(404).json({msg :"Search product not in inventory"})
        }
    }catch(err){
        res.status(400).json({error : err.message})
    }
    
})

module.exports = router;
