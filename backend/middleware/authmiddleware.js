const jwt=require("jsonwebtoken");
module.exports=(req,res,next)=>{
    try{
        const authheader=req.headers.authorization;
        if(!authheader)
            {
                return res.status(401).json({
                    message:"No token Provided"
                });

            }
        const token =authheader.split(" ")[1];
        const decoded=jwt.verify(token,process.env.jwt_key);
        req.user=decoded;
        next();

    }
    catch(error)
    {
        return res.status(401).json({
            message:"Invalid Token"
        });
    }
    


};