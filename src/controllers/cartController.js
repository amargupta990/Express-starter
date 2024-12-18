const {clearCartFromProduct}= require('../services/cartService')
const { getCart } = require("../services/cartService");
const { modifyCart } = require("../services/cartService");


async function getCardByUserId(req, res) {
  try {
    // console.log(req.body.userId);

    const response = await getCart(req.user.id);

    return res.status(201).json({
      message: "Cart fetched  successfully",
      success: true,
      data: response,
      error: {},
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: error.message || "An error occurred",
      success: false,
      data: {},
      error: error,
    });
  }
}

async function modifyaddProductToCart(req, res) {
  try {
    // console.log(req.body.userId);

    const response = await modifyCart(
      req.user.id,
      req.params.productId,
      (req.operation = "add")
    );
    console.log(response);

    return res.status(201).json({
      message: "item added successfully",
      success: true,
      data: response,
      error: {},
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: error.message || "An error occurred",
      success: false,
      data: {},
      error: error,
    });
  }
}
async function clearCartProductById(req, res) {
  try {
    const response = await clearCartFromProduct(req.user.id);
    return res.status(201).json({
      message: "item added successfully",
      success: true,
      data: response,
      error: {},
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: error.message || "An error occurred",
      success: false,
      data: {},
      error: error,
    });
  }
}
module.exports = {
  getCardByUserId,
  clearCartProductById,
  modifyaddProductToCart,
};
