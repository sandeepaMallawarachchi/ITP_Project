const mongoose=require("mongoose");
const Schema= mongoose.Schema;

const qualities=new Schema({
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


const quelities=mongoose.model("quelities",qualities);
module.exports=quelities