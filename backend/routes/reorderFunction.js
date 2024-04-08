const express= require("express")
const teaPack = require("../models/inventoryModels/product")
const reorderProducts = require("../models/inventoryModels/reorderProduct")
const nodeMailer = require("nodemailer")
const env = require("dotenv")
const router = express.Router()

env.config()

//reorder function
const checkInventoryLevel = async()=>{

     const products = await teaPack.find()
    
     //looping through all products in db to check whether it needs to be reordered
     products.forEach(async(item)=>{

        if(item.stockLevel <= item.reorderLevel && !item.emailSent){

            const Product = {
                productName : item.productName,
                teaType : item.teaType,
                stockLevel : item.stockLevel,
                reorderLevel : item.reorderLevel,
                
            }
            
            //saving the product that needs to be reordered to db
            const newProduct = new reorderProducts(Product)
            newProduct.save()
            .then((order)=>{
                console.log(`Product needs to be reordered`)
                //console.log(order)
            }).catch((err)=>{
                console.log(err)
            })
            
            //sending an email to notify
            sendMail(item.productName,item.stockLevel)

            //update email sent to true of a product
            await teaPack.findByIdAndUpdate(item.id,{emailSent : true})
        }
     })
}


//calling checkInventorylevel function 
setInterval(checkInventoryLevel,1000 * 5)

//get products to be reordered
router.get("/getReorders",async(req,res)=>{
    await reorderProducts.find().sort({createdAt : -1})
    .then((orders)=>{
        res.status(200).json(orders)
    }).catch((err)=>{
        res.status(400).json({err : err})
    })
})

//sending an email to inventory manager
const sendMail = async(name,quantity)=>{

    var transporter = nodeMailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.USER,
            pass : process.env.PASS
        }
    })

    var mailOptions = {
        from : process.env.USER,
        to : 'gunathilakaranketh@gmail.com',
        subject : 'Reorder notification',
        text : `This product "${name}" has reached its reorder level.Current stock level ${quantity}.Please consider ordering now`
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error)
        }else{
            console.log("Email sent :" + info.response)
        }
    })
} 

module.exports = router


