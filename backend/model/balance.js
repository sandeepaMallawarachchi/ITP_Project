const mongoose=require("mongoose");
const Schema= mongoose.Schema;

const balanceSh=new Schema({
    libilities:{
        type:String,
        required:true
    },
    qualities:{
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


const balance=mongoose.model("expenses",balanceSh);
module.exports=balance