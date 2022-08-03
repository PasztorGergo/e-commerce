import { Title, Text, Stack, createStyles, Button } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const useStyles = createStyles((theme) => ({
  button: {
    background: "#FF506E",
    "&:hover": {
      background: theme.fn.darken("#FF506E", 0.05),
    },
  },
}));

const Success: NextPage = () => {
  const { classes } = useStyles();
  return (
    <>
      <Head>
        <title>Successful Payment | Pastore</title>
      </Head>
      <Stack sx={{ width: "100%" }} align="center" justify="space-evenly">
        <Title mt="15vh">You have successfully bought your item(s)!</Title>
        <Text>
          Dear Customer, we received your order that we will process soon!
        </Text>
        <Text>Thanks for your purchase and patient!</Text>
        <Link href="/">
          <Button className={classes.button} rightIcon={<FaHome />}>
            Back to home
          </Button>
        </Link>
      </Stack>
    </>
  );
};

export default Success;
