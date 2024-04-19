const mongoose=require("mongoose");
const Schema= mongoose.Schema;

const balanceSh=new Schema({
    libilities:{
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


const libilities=mongoose.model("libilities",balanceSh);
module.exports=libilities