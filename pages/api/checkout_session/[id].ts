import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
//@ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //@ts-ignore
  const id: string = req.query.id;

  try {
    if (!id.startsWith("cs_")) {
      throw Error("Incorrect Checkout Session ID");
    }
    const checkoutSession = await stripe.checkout.sessions.retrieve(id);

    res.status(200).json(checkoutSession);
  } catch (error: any) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
}
