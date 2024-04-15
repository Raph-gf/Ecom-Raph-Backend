const { default: handlePayment } = require("../payments/stripe");

const paymentRouter = require("express").Router();
paymentRouter.post("/stripe/:userId", handlePayment);

export default paymentRouter;
