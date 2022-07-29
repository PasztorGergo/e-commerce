import type { NextPage } from "next";
import Head from "next/head";
import { Featured, Hero } from "../components";
import { app, credentials } from "../app";

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
  const user = await app.logIn(credentials);
  const featured = JSON.parse(
    JSON.stringify(await user.functions.getFeatured())
  );
  return {
    props: {
      featured,
    },
  };
}
