const jwt =require('jsonwebtoken')
const{SECRET_KEY}=require('../config/serverConfig')

async function isLoggedIn(req, res, next) {
    const token = req.cookies["token"]
    if (!token) {
        return res.status(401).json({
            success:false,
            data:{},
            error:"not aythenticated",
            message:"no auth btoken provided"
        })
    }
    const decoded= jwt.verify(token,SECRET_KEY);
    if (!decoded) {
        return res.status(401).json({
            success:false,
            data:{},
            error:"not aythenticated",
            message:"invalid auth btoken provided"
        })
    }
    req.user={
        email:decoded.email,
        id:decoded.id,
        role:decoded.role

    }
    console.log(req.user);
    
    next();
}

 function isAdmin(req, res, next) {
    const loggedInUser= req.user;
    console.log(loggedInUser.role);
    
    if (loggedInUser.role==="ADMIN") {
        next()
    }  else{
        return res.status(401).json({
            success:false,
            data:{},
            message:"you are not authorisd user ",
            error:{
                statusCode:401,
                reason:"Unauthorised user for this action "
            }
        })
    } 
   
}


module.exports={
    isLoggedIn,
    isAdmin
}