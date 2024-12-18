const Cart = require('../schema/cartSchema');
const NotFoundError = require('../utils/notFoundError');

async function createCart(userId) {
    try {
        const newCart = await Cart.create({
            user:userId
        })
        return newCart
    } catch (error) {
        console.log(error);
        
    }
}

async function getUserCart(userId) {
    try {
        const userCart = await Cart.findOne({
            user:userId
        }).populate("items.product")
        return userCart;
    } catch (error) {
        console.log(error);
        
    }
   
}

async function clearCart(userId) {
    try {
        const cart = await Cart.findOne({
            user:userId
        })
        if (!cart) {
            throw new NotFoundError("cart")
        }
        cart.items=[];
        await cart.save();
        return cart;
    } catch (error) {
        throw new NotFoundError("cart")
    }
}

module.exports={
    createCart,
    getUserCart,
    clearCart
}