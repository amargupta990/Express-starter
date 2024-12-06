const mongoose = require('mongoose')
const serverConfig = require('./serverConfig')

async function connectDB() {
    try{
        await  mongoose.connect(serverConfig.DB_URL);
        console.log("DB connected succesfully");
        
    }catch(error){
        console.log("connection failed..");
        
        console.log(error);
        
    }
}
module.exports=connectDB