import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productsController";

const productRouter = require("express").Router();

productRouter.get("/all-products", getAllProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/create-product", createProduct);
productRouter.put("/update-product/:id", updateProduct);
productRouter.delete("/delete-product/:id", deleteProduct);

export default productRouter;
