import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import type { NextPage } from "next";
import Head from "next/head";
import { app, credentials } from "../app";
import { Featured, Hero } from "../components";
import { featured } from "../models";

const Home: NextPage = ({ featured }: any) => {
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

  const client = new ApolloClient({
    link: new HttpLink({
      uri: process.env.GQL_URL,
      fetch: async (uri, options) => {
        //@ts-ignore
        options.headers.Authorization = `Bearer ${app.currentUser?.accessToken}`;
        return fetch(uri, options);
      },
    }),
    cache: new InMemoryCache(),
  });

  const featured = (
    await client.query({
      query: gql`
        query Featured {
          products {
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
