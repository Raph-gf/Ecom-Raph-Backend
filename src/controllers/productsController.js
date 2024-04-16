import Product from "../models/productsModel";
import User from "../models/userModel";
import Cart from "../models/cartModels";
import upload from "../middlewares.js/multer";

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
  console.log(req.files);
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }
    const fileNames = req.files.map((file) => file.filename);
    const newProduct = await Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      images: fileNames,
    });
    res
      .status(201)
      .json({ message: "Product created successfully", newProduct });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.file.filename,
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
    const productId = req.params.productId;
    console.log(productId);

    // Recherche du produit dans le panier de l'utilisateur
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user);

    const cart = await Cart.findById(user.userCarts[0]);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const index = cart.products.findIndex(
      (p) => p._id.toString() === productId
    );
    if (index === -1) {
      // Si le produit n'est pas trouvé dans le panier, renvoyer une erreur
      return res.status(404).json({ error: "Product not found in cart" });
    }

    // Suppression du produit du panier
    cart.products.splice(index, 1);
    await cart.save();

    // Répondre avec les données mises à jour du panier
    res.json({
      message: "Product successfully removed from cart",
      cart: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
