import { createStyles, Title, Text, Button } from "@mantine/core";
import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import getStripe from "../getStripe";

const useStyles = createStyles((theme) => ({
  section: {
    [theme.fn.largerThan("sm")]: {
      padding: ".2rem 6rem",
    },
    [theme.fn.smallerThan("sm")]: {
      padding: ".2rem 1rem",
    },
    marginTop: "15vh",
  },
}));

const redirectToCheckout = async () => {
  const {
    data: { id },
  } = await axios.post("/api/checkout_session", {
    items: Object.entries([{ _id: "", quantity: 1 }]).map(
      ([, { _id, quantity }]) => ({
        price: _id,
        quantity,
      })
    ),
  });

  const stripe = getStripe();
  await stripe.redirectToCheckout({ sessionId: id });
};

const Cart: NextPage = () => {
  const { classes } = useStyles();
  return (
    <>
      <Head>
        <title>Cart | Pastore</title>
      </Head>
      <section className={classes.section}>
        <Title order={2}>Your Cart</Title>
        <Text color="dimmed">
          Here you can find the products that you added recently
        </Text>
        <Button onClick={redirectToCheckout}>Checkout</Button>
      </section>
    </>
  );
};

export default Cart;
