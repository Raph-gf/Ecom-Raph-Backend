import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import productRouter from "./routes/productsRoute";
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/EcomDB");
  console.log(`[DATABASE] MongoDB is connected ⚡️`);
}

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json("Welcome to the huuudd");
});

app.use("/products", productRouter);

app.listen(port, () =>
  console.log(`[SERVER] Listening on http://localhost:${port}`)
);
