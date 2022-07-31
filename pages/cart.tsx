import { createStyles, Title, Text } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";

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
      </section>
    </>
  );
};

export default Cart;
