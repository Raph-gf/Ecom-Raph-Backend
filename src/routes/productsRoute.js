import {
  addProductToCart,
  createProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsFromUserCart,
  getProduct,
  removeProductFromCart,
  updateProduct,
  updateProductQuantity,
} from "../controllers/productsController";
import upload from "../middlewares.js/multer";

const productRouter = require("express").Router();

productRouter.get("/all-products", getAllProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/create-product", upload.array("images"), createProduct);
productRouter.post("/:id/addToCart/:userId", addProductToCart);
productRouter.put(
  "/:userId/updateProductQuantity/:productId",
  updateProductQuantity
);
productRouter.get("/:userId/cart", getAllProductsFromUserCart);
productRouter.put("/update-product/:id", updateProduct);
productRouter.delete("/delete-product/:productId", deleteProduct);
productRouter.delete("/:productId/cart/:id", removeProductFromCart);

export default productRouter;
