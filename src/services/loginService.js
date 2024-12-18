
const {findUser}=require('../repositories/userREpository')
const{SECRET_KEY,EXPIRY_KEY}=require('../config/serverConfig')
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

async function loginService(userdetails) {
    
    const email = userdetails.email;
    const password = userdetails.password;

    // Find the user by email
    const user = await findUser({
        email: email
    });

    if (!user) {
        throw {
            reason: "User with this email not found",
            statusCode: 404,
        };
    }

    // Compare the provided password with the stored hashed password
    const match = await bcrypt.compare(password, user.password); 

    if (!match) {
        throw {
            reason: "Incorrect password",
            statusCode: 401,
        };
    }
 const userRole= user.role ? user.role:"USER"

 
    // Generate JWT token
    const token = jwt.sign({ email:user.email , id:user._id , role:userRole },SECRET_KEY, {
        expiresIn: EXPIRY_KEY, 
    });

    if (!token) {
        throw {
            reason: "Error generating token",
            statusCode: 500,
        };
    }

    return token;
}

module.exports = {
    loginService
};
