const cloudinary=require('../config/cloudinaryconfig')
const fs= require('fs/promises')
const ProductRepository= require('../repositories/productRepository')

async function createProduct(productdetails) {
    const imagePath=productdetails.imagePath;
    if (imagePath) {
       try {
         const cloudinaryResponse=await cloudinary.uploader.upload(imagePath)
         var productImage = cloudinaryResponse.secure_url;
         await fs.unlink(process.cwd()+"/"+imagePath);
       } catch (error) {
        throw {reason:'not able to create product',statusCode:500}
       }
    }
    const product=ProductRepository.createProduct({
        ...productdetails,
        productImage:productImage
    });
    if (!product) {
        throw {reason:'not able to create product',statusCode:500}
    }
    return product;
    
}
async function getProductById(productId) {
    const response= await ProductRepository.getProductById(productId);
    if (!response) {
        throw {reason:'not able to find product',statusCode:404}
    }
    return response
}

async function deleteProductById(productId) {
    const response= await ProductRepository.deleteProductById(productId);
    if (!response) {
        throw {reason:'not able to find product',statusCode:404}
    }
    return response
}


module.exports={
    createProduct,
    deleteProductById,
    getProductById
}