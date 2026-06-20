exports.getTrends =
async(req,res)=>{

const trends =
await Task.aggregate([
{
$group:{
_id:{
month:{
$month:"$createdAt"
}
},
count:{
$sum:1
}
}
}
]);

res.json(trends);
};