const mongoose=require("mongoose");
const Schema= mongoose.Schema;

const balanceSh=new Schema({
    liabilities:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
}
)


const balance=mongoose.model("balance",balanceSh);
module.exports=balance