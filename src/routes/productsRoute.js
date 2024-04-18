import {
  addCartQty,
  addProductToCart,
  createProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsFromUserCart,
  getProduct,
  removeProductFromCart,
  updateProduct,
} from "../controllers/productsController";
// import upload from "../middlewares.js/multer";

const productRouter = require("express").Router();

// productRouter.post("/create-product", upload.array("images"), createProduct);
productRouter.get("/all-products", getAllProducts);
productRouter.post("/:id/addToCart/:userId", addProductToCart);
productRouter.get("/:productId", getProduct);
productRouter.get("/:userId/cart", getAllProductsFromUserCart);
// productRouter.put("/update-product/:id", updateProduct);
// productRouter.delete("/delete-product/:productId", deleteProduct);
productRouter.delete("/:productId/cart/:id", removeProductFromCart);

export default productRouter;
