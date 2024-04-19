import {
  addProductToCart,
  getAllProducts,
  getAllProductsFromUserCart,
  getProduct,
  removeProductFromCart,
} from "../controllers/productsController";

const productRouter = require("express").Router();

productRouter.get("/all-products", getAllProducts);
productRouter.post("/:id/addToCart/:userId", addProductToCart);
productRouter.get("/:productId", getProduct);
productRouter.get("/:userId/cart", getAllProductsFromUserCart);
productRouter.delete("/:productId/cart/:id", removeProductFromCart);

export default productRouter;
