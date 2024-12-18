const express = require('express');
const { getCardByUserId, modifyaddProductToCart, clearCartProductById } = require('../controllers/cartController');
const { isLoggedIn } = require('../validation/validator');

const cartRouter = express.Router();

cartRouter.get('/',isLoggedIn,getCardByUserId)
cartRouter.post('/:operation/:productId',isLoggedIn,modifyaddProductToCart)
cartRouter.delete('/products',isLoggedIn,clearCartProductById)

module.exports=cartRouter