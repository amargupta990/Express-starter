const {loginService} = require('../services/loginService')
async function loginUser(req,res){
    try {
        const response = await loginService(req.body);
        res.cookie("token" , response,{
            httpOnly:true,
            secure:false,
            mazAge:7*24*60*60*1000
        })
        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
            data: {},
            error: {},
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({
          message: error.message || "An error occurred",
          success: false,
          data: {},
          error: error,
        });
    }
  
}

module.exports={
    loginUser
}