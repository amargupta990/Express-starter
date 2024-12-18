const express = require('express');
const {loginUser}=require('../controllers/authController')

const authRouter= express.Router();

authRouter.post('/login',loginUser)


module.exports=authRouter
