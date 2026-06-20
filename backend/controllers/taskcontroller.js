const Task=require("../models/Task");

exports.createTask=async(req,res)=>
{
    try{
        const task=await Task.create({
<<<<<<< HEAD
            ...req.body, owner:req.user.id
=======
            ...req.body, 
            owner: req.user.id,
            user: req.user.id
>>>>>>> 58f1cc6468c759d7adb925c44188eec5fac85c6e
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
<<<<<<< HEAD
            owner:req.user.id
        });
=======
            $or: [
                { owner: req.user.id },
                { "sharedWith.userId": req.user.id }
            ]
        }).populate("owner", "email firstName lastName");
>>>>>>> 58f1cc6468c759d7adb925c44188eec5fac85c6e
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
        const task=await Task.findById(req.params.id)
            .populate("owner", "email firstName lastName")
            .populate("sharedWith.userId", "email firstName lastName");
        
        if(!task)
        {
            return res.status(404).json({
                message:"Task not Found"
            });
        }

        // Check if user has access
        const hasAccess = task.owner._id.toString() === req.user.id || 
                         task.sharedWith.some(share => share.userId._id.toString() === req.user.id);
        
        if(!hasAccess) {
            return res.status(403).json({
                message:"Access denied"
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
<<<<<<< HEAD
        const task=
        await Task.findOneAndUpdate({
            _id:req.params.id,
            owner:req.user.id
        },
        req.body,
    {
        new:true
=======
        const task= await Task.findById(req.params.id);
>>>>>>> 58f1cc6468c759d7adb925c44188eec5fac85c6e

        if(!task){
            return res.status(404).json({
                message:"Task not Found"
            });
        }

        // Check if user is owner or has edit permission
        const isOwner = task.owner.toString() === req.user.id;
        const hasEditPermission = task.sharedWith.find(
            share => share.userId.toString() === req.user.id && share.permission === "edit"
        );

        if(!isOwner && !hasEditPermission) {
            return res.status(403).json({
                message:"Edit permission denied"
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate("owner", "email firstName lastName");

        // Emit real-time update if status changed
        const io = require("../app").get("io");
        if(io && req.body.status) {
            const collaborators = task.sharedWith.map(s => s.userId.toString());
            collaborators.forEach(userId => {
                io.to(`user-${userId}`).emit("notification:status-updated", {
                    type: "STATUS_UPDATED",
                    taskId: task._id,
                    message: `Task "${task.title}" status changed to ${req.body.status}`,
                    oldStatus: task.status,
                    newStatus: req.body.status
                });
            });
        }

        res.status(200).json(updatedTask);

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
<<<<<<< HEAD
        const task=await Task.findOneAndDelete({
            _id:req.params.id,
            owner:req.user.id
        });
=======
        const task=await Task.findById(req.params.id);
        
>>>>>>> 58f1cc6468c759d7adb925c44188eec5fac85c6e
        if(!task){
            return res.status(404).json({
                message:"Task not Found"
            });
        }

        // Check if user is owner
        if(task.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message:"Only owner can delete task"
            });
        }

        await Task.findByIdAndDelete(req.params.id);

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
