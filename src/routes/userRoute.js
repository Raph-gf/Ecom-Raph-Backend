import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  login,
  signIn,
  updateUser,
} from "../controllers/userController";

const userRouter = require("express").Router();

userRouter.post("/connexion", login);
userRouter.post("/inscription", signIn);
userRouter.post("/create", createUser);
userRouter.get("/allusers", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.put("/:id/update", updateUser);
userRouter.delete("/:id/delete", deleteUser);

export default userRouter;
