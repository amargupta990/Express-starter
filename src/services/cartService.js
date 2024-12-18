const {getUserCart, clearCart} = require('../repositories/cartRepository');
const { getProductById } = require('../repositories/productRepository');
const NotFoundError= require('../utils/notFoundError')


async function getCart(userId) {
    const response = await getUserCart(userId)
    console.log("inside service ", response);
    
    if (!response) {
        throw {
            reason: "Cart not defined ",
            statusCode: 404,
        };
    }
    return response;
}

async function modifyCart(userId , productId, shouldAdd=true) {
    const quantityValue= (shouldAdd===true)? 1:-1;
    const cart = await getCart(userId);
    const product = await getProductById(productId);
    if (!product) {
        throw new NotFoundError("product")
    }
    if (!product.inStock && product.quantity <= 0) {
        throw new NotFoundError("product")
    }
    let foundProduct=false;
    cart.items.forEach(item=>{
        if (item.product.toString()===productId) {
            if (shouldAdd) {
                if (product.quantity >= item.quantity +1) {
                    item.quantity +=quantityValue;
                }else{
                    throw new NotFoundError("quantity")
                }
            }else{
                if (item.quantity >0) {
                    item.quantity +=quantityValue;
                    if (item.quantity==0) {
                        cart.items.filter(item=>item.product._id !=productId)
                        foundProduct=true;
                        return
                    }
                }else{
                    throw new NotFoundError("quantity")
                }
            }
           
            foundProduct=true;
        }
    })
    if (!foundProduct) {
        if (shouldAdd) {
            cart.items.push({
                product:productId,
                quantity:1
    
            })
        }else{
            throw new NotFoundError("product in the cart ")
        }
       
    }
    await cart.save()
    // product.quantity -=1;
    // await product.save();
    return cart;
}

async function clearCartFromProduct(userId) {
    const response = await clearCart(userId)
    return response;
}

module.exports={
    getCart,
    clearCartFromProduct,
    modifyCart
}