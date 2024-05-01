import Stripe from "stripe";
import User from "../models/userModel";
import Product from "../models/productsModel";
import Cart from "../models/cartModels";
import "dotenv/config";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handlePayment = async (req, res) => {
  try {
    // Récupérer les détails de l'utilisateur et du panier
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(400).send({ message: "Utilisateur non trouvé" });
    }

    const userCart = await Cart.findById(user.userCart).populate("products");
    if (!userCart) {
      return res.status(400).json({ message: "Panier non trouvé" });
    }

    // Construire les articles de la commande pour Stripe
    const products = req.body.lineItems;
    const lineItems = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error("Produit non trouvé");
        }

        const unitAmount = Math.round(product.price * 100);
        const image = product.images.length > 0 ? product.images[0] : null;

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

    // Créer la session de paiement avec Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: user.email,
      success_url: `${process.env.CLIENT_SITE_URL}/stripe/payment/success`,
      cancel_url: `${process.env.CLIENT_SITE_URL}/`,
    });

    // Construire le contenu dynamique de l'e-mail
    const productsList = await Promise.all(
      req.body.lineItems.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Produit avec l'ID ${item.productId} non trouvé`);
        }
        return {
          name: product.name,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );
    const productsInfo = productsList
      .map((product) => {
        return `${product.name} - Quantité: ${product.quantity}, Prix total: ${
          product.quantity * product.price
        } $`;
      })
      .join("\n");

    console.log(user);
    console.log(productsList);
    // Calculer le montant total de la commande
    const totalPrice = productsList.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);
    console.log(totalPrice);

    // Configurer et envoyer l'e-mail de confirmation
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    const mailOptions = {
      from: "raphaelgarnier1997@gmail.com",
      to: user.email, // Envoyer l'e-mail à l'utilisateur
      subject: "Confirmation de votre commande",
      text: `Cher(e) ${user.firstname},
    
    Nous vous remercions d'avoir passé commande sur notre boutique en ligne. Votre commande a été confirmée avec succès. Vous trouverez ci-dessous un récapitulatif de vos achats :
    
    Produits commandés :
    ${productsInfo}
    
    Total de la commande : ${totalPrice.toFixed(2)} $USD
    
    Votre commande sera traitée dans les plus brefs délais. Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter à l'adresse raphaelgarnier1997@gmail.com.
    
    Merci encore pour votre achat et à bientôt sur notre boutique en ligne !
    
    Cordialement,
    L'équipe de votre boutique en ligne`,
    };

    const sendEmail = () => {
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log("Erreur lors de l'envoi de l'e-mail :", err);
        } else {
          console.log("E-mail envoyé avec succès");
        }
      });
    };

    res.json({ url: session.url });
    sendEmail();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Une erreur est survenue", error: error.message });
  }
};

export default handlePayment;
