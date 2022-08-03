import {
  createStyles,
  Title,
  Text,
  Button,
  Stack,
  Anchor,
} from "@mantine/core";
import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo } from "react";
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
  button: {
    background: "#FF506E",
    "&:hover": {
      background: theme.fn.darken("#FF506E", 0.05),
    },
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
  const { cart, setCart } = useCart();
  console.log(cart);

  useEffect(() => {
    setCart(cart.filter(({ quantity }: cartItem) => quantity));
  }, []);

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
        <Stack mt="xl">
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
        <Link href="/">
          <Button
            mt="xl"
            className={classes.button}
            onClick={() => redirectToCheckout(cart)}
          >
            Checkout
          </Button>
        </Link>
      </section>
    </>
  );
};

export default Cart;
