const express = require("express")
const order = require("../models/inventoryModels/newOrder")

const router = express.Router()

//making order request to supplier manager
router.post("/addOrder",async(req,res)=>{

    const {productName,teaType,quantity} = req.body
    const newOrderProduct = {
        productName,
        teaType,
        quantity,
        date : new Date().toLocaleDateString(),
        status : "Low stock"
    }
    
    const newOrder = new order(newOrderProduct)
     await newOrder.save().then(()=>{
        res.status(200).json({msg : "Order requested successfully"})
    }).catch((err)=>{
        res.status(400).json({err: err.message})
    })
})

//update order status
router.patch("/updateOrderStatus/:id",async(req,res)=>{
    const {id} = req.params
    
    await order.findByIdAndUpdate(id,{status : "Order Added"})
    .then(()=>{
        res.status(200).json({msg : "Order status updated"})
    }).catch((err)=>{
        res.status(400).json({err : err.message})
    })
})


//get all orders
router.get("/getAllOrders",async(req,res)=>{

    await order.find().sort({createdAt : -1})
    .then((orders)=>{
        res.status(200).json(orders)
    }).catch((err)=>{
        res.status(400).json({err: err.message})
    })
})

module.exports = router