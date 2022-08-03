import { loadStripe } from "@stripe/stripe-js";

//@ts-ignore
const getStripe = () => loadStripe(process.env.STRIPE_PUBLIC_KEY);

export default getStripe;
