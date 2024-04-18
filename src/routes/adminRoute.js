import Auth from "../middlewares/auth";
import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controllers/productsController";
import upload from "../middlewares/multer";

const adminRouter = require("express").Router();

adminRouter.put("/products/update-product/:id", updateProduct);
adminRouter.delete("/products/delete-product/:productId", deleteProduct);
adminRouter.get("/products/:productId", getProduct);
adminRouter.post(
  "/products/create-product",
  upload.array("images"),

  createProduct
);

export default adminRouter;
