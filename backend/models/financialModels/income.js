const mongoose=require("mongoose");
const Schema= mongoose.Schema;

const incomeSh=new Schema({
    date:{
        type:String,
        required:true
    },
    category:{
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


const income=mongoose.model("income",incomeSh);
module.exports=income