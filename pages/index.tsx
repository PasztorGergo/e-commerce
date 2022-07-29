import type { NextPage } from "next";
import Head from "next/head";
import { Text } from "@mantine/core";
import { useState, useEffect } from "react";
import { app, credentials } from "../app";

const Home: NextPage = () => {
  const [allProducts, setAllProducts] = useState<any>();

  useEffect(() => {
    async function fetch() {
      try {
        const user = await app.logIn(credentials);
        const products = await user.functions.getAllProducts();

        setAllProducts(products);
      } catch (err) {
        console.log(err);
      }
    }
    fetch();
  }, []);

  return (
    <>
      <Head>
        <title>Home Page | Pastore</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {allProducts &&
        allProducts.map(({ name, price }: any, i: number) => (
          <Text key={i}>
            {name} ${price}
          </Text>
        ))}
    </>
  );
};

export default Home;
