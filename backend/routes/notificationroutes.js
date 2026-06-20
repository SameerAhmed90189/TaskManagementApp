const express=require("express");
const router=express.Router();

const auth =
require("../middleware/authmiddleware");

const {
getNotifications
}=require("../controllers/notificationcontroller");

router.get("/",auth,getNotifications);

module.exports=router;