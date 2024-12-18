const express = require('express');
const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter=require('./routes/authRoute')
var cookieParser = require('cookie-parser');
const { isLoggedIn } = require('./validation/validator');
const uploader= require('./middleware/multerMiddleware')
const cloudinary=require('./config/cloudinaryconfig');
const productRouter = require('./routes/productRoute');

const app = express()
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));


// import routes...
app.use('/users',userRouter);
app.use('/carts',cartRouter);
app.use('/auth',authRouter);
app.use('/products',productRouter);


app.get('/ping',isLoggedIn, (req,res)=>{
    console.log(req.body);
    return res.json({message:"pong"})

})
app.post('/photo',uploader.single('photos'), async (req,res)=>{
    console.log(req.file);
    
    const uploadResult = await cloudinary.uploader.upload(req.file.path);
        console.log(uploadResult);
    
    return res.json({message:"ok"})

})


app.listen(ServerConfig.PORT , async ()=>{
    connectDB()
    console.log(`Server started at port ${ServerConfig.PORT}`);
    
})