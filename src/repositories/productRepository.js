const Product=require('../schema/productSchema')

async function createProduct(productdetails) {
    try {
      const response=  await Product.create(productdetails)
        return response
    } catch (error) {
        console.log(error);
        
    }
}

async function getProductById(productId) {
    try {
        const product = await Product.findById(productId)
        return product;
    } catch (error) {
        console.log(error);
        
    }
}
async function deleteProductById(productId) {
    try {
        const product = await Product.findByIdAndDelete(productId)
        return product;
    } catch (error) {
        console.log(error);
        
    }
}

module.exports={
    createProduct,
    getProductById,
    deleteProductById
}