import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  login,
  signIn,
  updateUser,
} from "../controllers/userController";
import { auth } from "../middlewares/auth";

const userRouter = require("express").Router();

userRouter.post("/connexion", login);
userRouter.post("/inscription", signIn);
userRouter.post("/create", createUser);
userRouter.get("/allusers", auth, getAllUsers);
userRouter.get("/:id", auth, getUser);
userRouter.put("/:id/update", auth, updateUser);
userRouter.delete("/:id/delete", auth, deleteUser);

export default userRouter;
