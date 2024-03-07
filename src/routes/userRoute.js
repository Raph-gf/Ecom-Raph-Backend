import { login, signIn } from "../controllers/userController";

const userRouter = require("express").Router();

userRouter.post("/connexion", login);
userRouter.post("/inscription", signIn);

export default userRouter;
