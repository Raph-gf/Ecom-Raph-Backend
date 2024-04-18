import { Router } from "express";
import handlePayment from "../payments/stripe";

const paymentRouter = Router();
paymentRouter.post("/stripe/:userId", handlePayment);

export default paymentRouter;
