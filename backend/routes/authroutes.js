const express=require("express");
const router=express.Router();

const {register,login}=require("../controllers/authcontroller");

const {registerValidator,loginValidator}= require("../validators/authvalidator");
const {validationResult}=require("express-validator");


const validate=(
    req,res,next
) =>
{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            errors:errors.array()
        });

    }
    next();
};

router.post("/register",registerValidator,validate,register);

router.post("/login",loginValidator,validate,login);

module.exports=router;