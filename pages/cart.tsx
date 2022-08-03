import { createStyles, Title, Text, Button, Stack } from "@mantine/core";
import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { useMemo } from "react";
import { CartItem } from "../components";
import { useCart } from "../context/CartProvider";
import getStripe from "../getStripe";
import { cartItem } from "../models";

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
const redirectToCheckout = async (cart: Array<cartItem>) => {
  const { sessionId }: any = await fetch("/api/checkout_session", {
    body: JSON.stringify(
      cart.map(({ _id, quantity }: any, i: number) => ({
        price: _id,
        quantity,
      }))
    ),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => res.json());
  const stripe = await getStripe();

  await stripe?.redirectToCheckout({ sessionId });
};

const Cart: NextPage = () => {
  const { classes } = useStyles();
  const { cart } = useCart();
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
        <Stack>
          {cart?.map(
            ({ _id, name, photoURL, price, quantity }: cartItem, i: number) => (
              <CartItem
                key={_id}
                _id={_id}
                name={name}
                price={price}
                quantity={quantity}
                photoURL={photoURL}
              />
            )
          )}
        </Stack>
        <Button onClick={() => redirectToCheckout(cart)}>Checkout</Button>
      </section>
    </>
  );
};

export default Cart;
