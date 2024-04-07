import Product from "../models/productsModel";
import User from "../models/userModel";
import Cart from "../models/cartModels";

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
    const newproduct = await Product.create(req.body);
    console.log(newproduct.email);
    res.json({ message: "Product created succesfully", newproduct });
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

export const getAllProductsFromUserCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const panier = await Cart.findById(user.userCarts).populate("products");
    if (!panier) {
      return res.status(404).json({ error: "Panier introuvable" });
    }

    res.json({ User: user, Cart: panier });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    let cart = await Cart.findById(user.userCarts);

    if (!cart) {
      cart = await Cart.create({ products: [] });

      user.userCarts.push(cart._id);
      user.save();
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }
    const existingProduct = (item) => item.product === product._id;
    const verifiedProduct = cart.products.findIndex(existingProduct);
    if (verifiedProduct !== -1) {
      cart.products[verifiedProduct].quantity += 1;
    }

    cart.products.push(product._id);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    // Vérifie si le produit existe
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Vérifie si l'utilisateur existe
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Vérifie si le panier de l'utilisateur existe
    if (!user.userCarts || user.userCarts.length === 0) {
      return res.status(404).json({ error: "User cart not found" });
    }

    // Trouve le panier de l'utilisateur contenant le produit à supprimer
    const userCart = await Cart.findById(user.userCarts[0]);
    if (!userCart) {
      return res.status(404).json({ error: "User cart not found" });
    }

    // Supprime le produit du panier de l'utilisateur
    const index = userCart.products.indexOf(req.params.productId);
    if (index !== -1) {
      userCart.products.splice(index, 1);
      await userCart.save();
    }

    res.json({ message: "Product successfully removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
