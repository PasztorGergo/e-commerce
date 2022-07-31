import { gql } from "@apollo/client";
import {
  Button,
  createStyles,
  Group,
  Stack,
  Title,
  Text,
  NumberInput,
} from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import { useMemo, useReducer } from "react";
import { app, client, credentials } from "../../app";
import { product } from "../../models";
import Image from "next/image";
import { FaCartPlus, FaMinus, FaPlus } from "react-icons/fa";
import { AmountButton } from "../../components";
import { openConfirmModal } from "@mantine/modals";
import Link from "next/link";

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

const Product: NextPage = ({ products }: any) => {
  const product: product = useMemo(() => products[0], []);
  const { classes } = useStyles();

  const addToCart = () => {
    openConfirmModal({
      title: "Product has just been added to the cart",
      children: (
        <Group>
          <Image
            src={product.photoURL}
            width={213}
            height={213}
            alt={product.name}
          />
          <Stack>
            <Title order={3}>Would you like to continue shopping?</Title>
            <Text>
              {product.name
                ?.split("-")
                .map(
                  (current: any) =>
                    current.charAt(0).toUpperCase() + current.slice(1)
                )
                .join(" ")}{" "}
              has just been added to your cart.
            </Text>
          </Stack>
        </Group>
      ),
      labels: {
        confirm: (
          <Link href="/cart">
            <a>Go to checkout</a>
          </Link>
        ),
        cancel: "Continue shopping",
      },
      confirmProps: {
        sx: (theme) => ({
          background: "#FF506E",
          "&:hover": {
            background: theme.fn.darken("#FF506E", 0.05),
          },
        }),
      },
    });
  };

  return (
    <>
      <Head>
        <title>
          {product.name
            ?.split("-")
            .map(
              (current: any) =>
                current.charAt(0).toUpperCase() + current.slice(1)
            )
            .join(" ")}{" "}
          | Pastore
        </title>
      </Head>
      <section className={classes.section}>
        <Group align="self-start" sx={{ gap: "1rem" }}>
          <Image src={product.photoURL} width="445" height="445" />
          <Stack align="flex-start">
            <Title order={2}>
              {product.name
                .split("-")
                .map(
                  (current) =>
                    current.charAt(0).toUpperCase() + current.slice(1)
                )
                .join(" ")}
            </Title>
            <Text>{product.description}</Text>
            <Group grow>
              <AmountButton />
              <Button
                className={classes.button}
                rightIcon={<FaCartPlus />}
                onClick={() => addToCart()}
              >
                Add to cart
              </Button>
            </Group>
          </Stack>
        </Group>
      </section>
    </>
  );
};

export default Product;

export async function getStaticPaths() {
  await app.logIn(credentials);
  const paths = (
    await client.query({
      query: gql`
        query GetIDs {
          products {
            name
          }
        }
      `,
    })
  ).data.products.map((x: any) => ({
    params: { id: x.name },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  await app.logIn(credentials);
  const products = (
    await client.query({
      query: gql`
        query GetProduct {
          products(query: {name: "${params.id}"}) {
            _id
            name
            description
            photoURL
            price
            rating
          }
        }
      `,
    })
  ).data.products;

  return {
    props: {
      products,
    },
  };
}
