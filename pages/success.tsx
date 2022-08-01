import { Title } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";

const Success: NextPage = () => {
  return (
    <>
      <Head>
        <title>Successful Payment | Pastore</title>
      </Head>
      <Title mt="15vh">Success!</Title>
    </>
  );
};

export default Success;
