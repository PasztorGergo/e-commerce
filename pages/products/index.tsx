import { gql, useApolloClient } from "@apollo/client";
import { createStyles } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { app, client, credentials } from "../../app";
import { ProductCard } from "../../components";
import { product } from "../../models";

const useStyles = createStyles((theme) => ({
  section: {
    [theme.fn.largerThan("sm")]: {
      padding: ".2rem 6rem",
      gridTemplateColumns: "repeat(auto-fill, 20rem)",
    },
    [theme.fn.smallerThan("sm")]: {
      padding: ".2rem 1rem",
      gridTemplateColumns: "100%",
    },
    marginBlock: "15vh",
    display: "grid",
    gridTemplateRows: "auto",
    gap: "1rem",
    justifyContent: "center",
  },
}));

const Products: NextPage = ({ products }: any) => {
  const { classes } = useStyles();
  return (
    <>
      <Head>
        <title>Products | Pastore</title>
      </Head>
      <section className={classes.section}>
        {products.map(
          (
            {
              _id,
              description,
              name,
              photoURL,
              price,
              rating,
              stripe_id,
            }: product,
            i: number
          ) => (
            <ProductCard
              key={_id}
              _id={_id}
              description={description}
              name={name}
              photoURL={photoURL}
              price={price}
              rating={rating}
              stripe_id={stripe_id}
            />
          )
        )}
      </section>
    </>
  );
};

export default Products;

export async function getStaticProps() {
  await app.logIn(credentials);

  const products: Array<product> = (
    await client.query({
      query: gql`
        query GetProducts {
          products {
            _id
            name
            description
            price
            photoURL
            rating
            stripe_id
          }
        }
      `,
    })
  ).data.products;

  return {
    props: {
      products,
    },
    revalidate: 10,
  };
}
