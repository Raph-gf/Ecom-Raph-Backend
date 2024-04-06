import {
  addProductToCart,
  createProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsFromUserCart,
  getProduct,
  removeProductFromCart,
  updateProduct,
} from "../controllers/productsController";

const productRouter = require("express").Router();

productRouter.get("/all-products", getAllProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/create-product", createProduct);
productRouter.post("/:id/addToCart/:userId", addProductToCart);
productRouter.get("/:userId/cart", getAllProductsFromUserCart);
productRouter.put("/update-product/:id", updateProduct);
productRouter.delete("/delete-product/:id", deleteProduct);
productRouter.delete("/:productId/cart/:id", removeProductFromCart);

export default productRouter;
