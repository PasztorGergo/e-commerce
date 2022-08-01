import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";
//@ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        //@ts-ignore
        payment_method_options: ["card"],
        line_items: req.body.items ?? [],
        success_url: `${req.headers.origin}/success?session_id={CHECKOT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
      });
    } catch (error) {
      res.status(500);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed!");
  }
}
