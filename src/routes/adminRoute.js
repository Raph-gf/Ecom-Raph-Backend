import {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controllers/productsController";
import upload from "../middlewares/multer";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController";

const adminRouter = require("express").Router();

adminRouter.put("/products/update-product/:id", updateProduct);
adminRouter.delete("/products/delete-product/:productId", deleteProduct);
adminRouter.get("/products/:productId", getProduct);
adminRouter.post(
  "/products/create-product",
  upload.array("images"),

  createProduct
);
adminRouter.get("/user/allusers", getAllUsers);
adminRouter.get("/user/:id", getUser);
adminRouter.put("/user/:id/update", updateUser);
adminRouter.delete("/user/:id/delete", deleteUser);

export default adminRouter;
