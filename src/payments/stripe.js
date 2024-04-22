import Stripe from "stripe";
import User from "../models/userModel";
import Product from "../models/productsModel";
import Cart from "../models/cartModels";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handlePayment = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const userCart = await Cart.findById(user.userCart).populate("products");
    if (!userCart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    const products = req.body.lineItems;
    console.log("Cart Products:", products);

    const lineItems = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error("Product not found");
        }
        console.log("Product:", product);
        const unitAmount = Math.round(product.price * 100);
        const image = product.images.length > 0 ? product.images[1] : null;
        console.log(image);
        return {
          price_data: {
            currency: "usd",
            unit_amount: unitAmount,
            product_data: {
              name: product.name,
              description: product.description,
              images: image ? [image] : [],
            },
          },
          quantity: item.quantity,
        };
      })
    );

    console.log("Line Items:", lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: user.email,
      success_url: `${process.env.CLIENT_SITE_URL}/stripe/payment/success`,
      cancel_url: "http://localhost:3456/payment/stripe/failed",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

export default handlePayment;
