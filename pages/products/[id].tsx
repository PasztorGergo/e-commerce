import { gql } from "@apollo/client";
import { NextPage } from "next";
import Head from "next/head";
import { app, client, credentials } from "../../app";
import { product } from "../../models";

const Product: NextPage = ({ product }: any) => {
  console.log(product);
  return (
    <>
      <Head>
        <title>{product?.name} | Pastore</title>
      </Head>
      <div>{product?.name}</div>
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
    params: { id: x.name.toLowerCase().replaceAll(" ", "-") },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const name = (params.id as string)
    .split("-")
    .map((current) => current.charAt(0).toUpperCase() + current.slice(1))
    .join(" ");

  console.log(name);

  await app.logIn(credentials);
  const product = (
    await client.query({
      query: gql`
        query GetProduct {
          products(query: {name: "${name}"}) {
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
      product,
    },
  };
}
