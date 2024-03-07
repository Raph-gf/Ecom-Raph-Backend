import User from "../models/userModel";
import "dotenv/config";

const secretKey = process.env.SECRETKEY;

const Authenticate = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedToken = jwt.verify(token, secretKey);
    console.log(decodedToken.id);
    const userAuth = await User.findOne({ _id: decodedToken.id });
    if (!userAuth) {
      const error = new Error("User not found");
      throw error;
    }
    req.userAuth = userAuth.id;
    next();
  } catch (error) {
    next(error);
  }
};
export default Authenticate;
