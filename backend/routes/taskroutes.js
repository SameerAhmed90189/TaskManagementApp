const express=require("express");
const router=express.Router();
const authmiddleware=require("../middleware/authmiddleware");
const{validationResult}=require("express-validator");
const{createTaskValidator}=require("../validators/taskvalidator");
const{createTask,getTasks,getTaskById,updateTask,deleteTask}=require("../controllers/taskcontroller");

const validate=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty)
    {
        return res.status(400).json({
            errors:errors.array()
        });
    }
    next();
};
router.post("/",authmiddleware,createTaskValidator,validate,createTask);

router.get("/",authmiddleware,getTasks);
router.get("/:id", authmiddleware, getTaskById);

router.put("/:id",authmiddleware,updateTask);

router.delete("/:id",authmiddleware,deleteTask);
router.get("/test", (req, res) => {
  res.send("Tasks Route Working");
});

module.exports=router;