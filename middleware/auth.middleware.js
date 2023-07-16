const jwt=require("jsonwebtoken");

require("dotenv").config();

const auth =(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    if(token){
        try {
            const decoded=jwt.verify(token,process.env.secret)
            if(decoded){
                req.body.userId=decoded.userId;
                req.body.user=decoded.user;
                next()
            }else{
                res.json({msg:"Not Authorized to access please Login Again"})
            }
        } catch (err) {
            res.json({error:err.message})
        }
    }else{
res.json({msg:"Please Login"})
    }
}

module.exports={
    auth
}