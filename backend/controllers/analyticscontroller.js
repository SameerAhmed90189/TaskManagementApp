const Task=require("../models/Task");

exports.getOverview =
async(req,res)=>{

const total =
await Task.countDocuments();

const completed =
await Task.countDocuments({
status:"Completed"
});

const pending =
await Task.countDocuments({
status:"Pending"
});

const inProgress =
await Task.countDocuments({
status:"In Progress"
});

res.json({
total,
completed,
pending,
inProgress
});
};