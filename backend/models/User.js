const mongoose=require("mongoose");
const userschema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    
    },
    sharedTasksHistory:[
        {
            taskId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Task"
            },
            sharedAt:{
                type:Date,
                default:Date.now
            },
            sharedBy:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        }
    ]
 }, 
{
     timestamps:true
});

module.exports=mongoose.model("User",userschema);
