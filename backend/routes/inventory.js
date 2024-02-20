const router = require("express").Router();
const teaPack = require("../models/inventoryModels/teaPack");



//add a new tea pack 
router.route("/addTeaPack").post(async(req,res)=>{
    const {productCode,teaType,stockLevel,unitPrice,weight,packageType,manDate,expDate,reorderLevel} = req.body;

    const newPack = new teaPack({productCode,teaType,stockLevel,unitPrice,weight,packageType,manDate,expDate,reorderLevel
    });

    await newPack.save().then(()=>{
        res.json("Inserted successfully");
    }).catch((err)=>{
        console.log(err);
    });
});

//get all tea packs
router.route("/getTeaPack").get(async(req,res)=>{
    await teaPack.find().then((Teapacks)=>{
        res.json(Teapacks);
     }).catch((err)=>{
        console.log(err);
     });
});

//update tea packs
router.route("/updateTeaPack/:id").put(async(req,res)=>{
    const updateId = req.params.id;
    const {productCode,teatype,stockLevel,unitPrice,weight,packageType,manDate,expDate,reorderLevel} = req.body;

    const updatePacket = {productCode,teatype,stockLevel,unitPrice,weight,packageType,manDate,expDate,reorderLevel}

    await teaPack.findByIdAndUpdate(updateId,updatePacket).then((update)=>{
        res.status(200).send({status : "user updated",user : update});
    }).catch((err)=>{
        console.log(err);
    });
});

//delete tea pack
router.route("/deleteTeaPack/:id").delete(async(req,res)=>{
    const deleteId = req.params.id;
    await teaPack.findByIdAndDelete(deleteId).then((deleteO)=>{
        res.status(200).send({status : "user deleted",user : deleteO});
    }).catch((err)=>{
        console.log(err);
    })
})

//retreive a single pack
router.route("/getPack/:id").get(async(req,res)=>{
    const id = req.params.id;
    await teaPack.findById(id).then((object)=>{
        res.status(200).send({status :"retreive one user", user : object});
    }).catch((err)=>{
        console.log(err);
    });
    
});



module.exports = router;