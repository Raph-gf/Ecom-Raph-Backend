import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import productRouter from "./routes/productsRoute";
import userRouter from "./routes/userRoute";
import paymentRouter from "./routes/paymentRoute";
import adminRouter from "./routes/adminRoute";
import { auth } from "./middlewares/auth";

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/EcomDB");
  console.log(`[DATABASE] MongoDB is connected ⚡️`);
}

const app = express();
const port = process.env.PORT;
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./uploads/images"));

app.get("/", (req, res) => {
  res.json("Welcome to the huuudd");
});
app.get("/payment/stripe/success", (req, res) => {
  res.send(
    "Paiement réussi ! Merci pour votre achat. tu m'a bien rhalass jvai bien manger haha 😂"
  );
});

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/payment", paymentRouter);
app.use("/admin", auth, adminRouter);

app.listen(port, () =>
  console.log(`[SERVER] Listening on http://localhost:${port}`)
);
