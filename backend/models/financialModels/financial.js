const mongoose=require("mongoose");
const Schema= mongoose.Schema;

const expensesSh=new Schema({
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


const expenses=mongoose.model("expenses",expensesSh);
module.exports=expenses