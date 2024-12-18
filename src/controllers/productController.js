const { getProductById, deleteProductById } = require('../repositories/productRepository');
const {createProduct}=require('../services/productService')

async function addProduct(req , res) {
  try {
      const product = await createProduct({
          productName:req.body.productName,
          description:req.body.description,
          productImage:req.file?.path,
          price:req.body.price,
          inStock:req.body.inStock,
          category:req.body.category,
      })
      console.log(product);
      
      res.status(201).json({
        success:true,
        message:"successfully created the product",
        data:product,
        error:{},
    })

  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({
        success:error,
        message:error.reason,
        data:{},
        error:error,
    })
    
  }
}

async function getProduct(req , res) {
    try {
      const response = await getProductById(req.params.id);
      return res.status(200).json({
        success:true,
        message:"successfully fetched the product",
        error:{},
        data:response
      })
    } catch (error) {
      return res.status(error.statusCode).json({
        success:false,
        message:error.reason,
        data:{},
        error:error
      })
    }
}

async function deleteProduct(req , res) {
    try {
      const response = await deleteProductById(req.params.id);
      return res.status(200).json({
        success:true,
        message:"successfully deleted the product",
        error:{},
        data:response
      })
    } catch (error) {
      return res.status(error.statusCode).json({
        success:false,
        message:error.reason,
        data:{},
        error:error
      })
    }
}

module.exports={
    addProduct,
    getProduct,
    deleteProduct
}