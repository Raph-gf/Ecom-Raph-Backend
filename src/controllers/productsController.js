import Product from "../models/productsModel";
import Cart from "../models/cartModels";
import User from "../models/userModel";

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    console.log(allProducts);
    res.json(allProducts);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    console.log(product);
    res.json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const createProduct = async (req, res) => {
  try {
    const newUser = await Product.create(req.body);
    console.log(newUser.email);
    res.json({ message: "Product created succesfully", newUser });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const updateProduct = async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    console.log(updateProduct);
    console.log(updateProduct);
    await updateProduct.save();
    res.json({ message: "Product updated succesfully", updateProduct });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete({
      _id: req.params.id,
    });
    console.log(deleteProduct);
    res.json({ message: "Product deleted succesfully", deleteProduct });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      user.cart.push([product.id]);
      await user.save();
    }

    res.json({ user, message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
