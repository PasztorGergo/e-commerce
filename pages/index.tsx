import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import { app, client, credentials } from "../app";
import { Featured, Hero } from "../components";
import { featured } from "../models";

const Home: NextPage = ({ featured }: any) => {
  console.log(process.env.STRIPE_SECRET_KEY);
  return (
    <>
      <Head>
        <title>Home Page | Pastore</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Featured featured={featured} />
    </>
  );
};

export default Home;
export async function getStaticProps() {
  await app.logIn(credentials);

  const featured = (
    await client.query({
      query: gql`
        query Featured {
          products(limit: 3) {
            _id
            description
            name
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
      featured,
    },
  };
}
