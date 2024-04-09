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
      _id: req.params.productId,
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

    const panier = await Cart.findById(user.userCarts).populate({
      path: "products",
      populate: {
        path: "product",
      },
    });

    if (!panier) {
      return res.status(404).json({ error: "Panier introuvable" });
    }

    res.json({ User: user, Cart: panier, products: panier.products });
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

    cart.products.push({
      product: product,
      quantity: 1,
    });
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProductQuantity = async (req, res) => {
  try {
    // Recherche de l'utilisateur
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Recherche du panier de l'utilisateur
    const cart = await Cart.findById(user.userCarts);
    if (!cart) {
      return res.status(404).json({ message: "Panier non trouvé." });
    }

    // ID du produit à mettre à jour
    const productId = await Product.findById(req.params.productId);
    if (!productId) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }
    // Nouvelle quantité à définir
    const newQuantity = req.body.quantity;

    // Trouver l'élément correspondant dans le panier
    const cartItem = cart.products.find((product) => product._id === productId);

    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Produit non trouvé dans le panier." });
    }

    // Mettre à jour la quantité du produit dans le panier
    cartItem.quantity = newQuantity;

    // Sauvegarder les modifications apportées au panier
    await cart.save();

    res.json(cartItem);
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de la quantité du produit :",
      error
    );
    res.status(500).json({
      message: "Erreur lors de la mise à jour de la quantité du produit.",
    });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let cart = await Cart.findById(user.userCarts[0]);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.products.splice(product, 1);
    console.log(cart);
    cart.save();
    cart = await Cart.findById(cart._id).populate("products");

    res.json({
      DeletedProduct: product,
      Cart: cart,
      message: "Product successfully removed from cart",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
