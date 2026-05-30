const Task=require("../models/Task");

exports.createTask=async(req,res)=>
{
    try{
        const task=await Task.create({
            ...req.body, user:req.user.id
        });
        res.status(201).json(task);
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
};

exports.getTasks=async(req,res)=>{
    try{
        const tasks=await Task.find({
            user:req.user.id
        });
        res.status(200).json(tasks);
    }
    catch(error)
    {
        res.status(500).json({
            message:error.message
        });
    }

};

exports.getTaskById=async(req,res)=>{
    try{
        const task=await Task.findOne({
        _id:req.params.id,user:req.user.id });
        if(!task)
        {
            return res.status(404).json({
                message:"Task not Found"
            });
        }
        res.status(200).json(task);

    }
    catch(error)
    {
        res.status(500).json({
            message:error.message});
    }
};

exports.updateTask=async(req,res)=>
{
    try{
        const task=
        await Task.findOneAndUpdate({
            _id:req.params.id,
            user:req.user.id
        },
        req.body,
    {
        new:true


    });

    if(!task){
        return res.status(404).json({
            message:"Task not Found"
        });
    }
    res.status(200).json(task);

    }
    catch(error)
    {
        res.status(500).json({
            message:error.message
        });
    }
};
exports.deleteTask=async(req,res)=>
 {
    try{
        const task=await Task.findOneAndDelete({
            _id:req.params.id,
            user:req.user.id
        });
        if(!task){
            return res.status(404).json({
                message:"Task not Found"
            });
        }
        res.status(200).json({
            message:"Task deleted"
        });
    }
    catch(error)
    {
        res.status(500).json({
            message:error.message
        });
    }


 };