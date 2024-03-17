const mongoose=require("mongoose");
const Schema= mongoose.Schema;

const expensesSh=new Schema({
    month:{
        type:String,
        required:true
    },
    expenseType:{
        type:String,
        required:true
    },
    value:{
        type:Number,
        required:true
    }
}
)


const expenses=mongoose.model("expenses",expensesSh);
module.exports=expenses