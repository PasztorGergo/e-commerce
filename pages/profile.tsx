import { gql } from "@apollo/client";
import {
  Avatar,
  createStyles,
  Group,
  Stack,
  Title,
  Text,
  Grid,
  Button,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { closeAllModals, openModal } from "@mantine/modals";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FaRegImage, FaTimes, FaUpload } from "react-icons/fa";
import { client } from "../app";
import { ProductCard } from "../components";
import { useAuth } from "../context/AuthProvider";

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
  avatar: {
    borderRadius: "50%",
    width: "10rem",
    height: "10rem",
  },
}));

const Profile: NextPage = () => {
  const { user } = useAuth();
  const { classes } = useStyles();
  const [products, setProducts] = useState<any>();
  const [picture, setPicture] = useState<any>();

  const uploadPP = async () => {
    openModal({
      title: "Add new profile picture",
      children: (
        <Stack>
          <Dropzone onDrop={(e) => setPicture(e[0])} accept={IMAGE_MIME_TYPE}>
            <Group position="center" spacing="xl">
              <Dropzone.Accept>
                <FaUpload size={50} color="#FF506E" />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <FaTimes size={50} color="#FF506E" />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <FaRegImage size={50} color="#1E293B" />
              </Dropzone.Idle>
              <Text>Drop your new profile picture here</Text>
            </Group>
          </Dropzone>
          <Button
            leftIcon={<FaUpload />}
            className={classes.button}
            onClick={() => closeAllModals()}
          >
            Upload
          </Button>
        </Stack>
      ),
    });
  };

  useEffect(() => {
    const getProducts =
      user.products?.length > 0 &&
      user?.products.map(
        async (id: string) =>
          await client.query({
            query: gql`
      query GetProducts{
        products(query: {_id: "${id}"}){
          _id
          name
          description
          rating
          price
          photoURL
        }
      }
    `,
          })
      );
    setProducts(getProducts);
  }, [user]);

  return (
    <>
      <Head>
        <title>Manage Profile | Pastore</title>
      </Head>
      <section className={classes.section}>
        <Stack>
          <Group>
            <Avatar
              src={user?.photoURL}
              alt={user?.name}
              className={classes.avatar}
              color="pink"
              onClick={uploadPP}
            />
            <Stack>
              <Title order={2}>{user?.name}</Title>
              <Text color="dimmed">{user.email}</Text>
            </Stack>
          </Group>
          <Grid columns={4}>
            {products &&
              products.map(
                ({ _id, name, price, rating, description, photoURL }: any) => (
                  <ProductCard
                    stripe_id=""
                    _id={_id}
                    name={name}
                    rating={rating}
                    description={description}
                    photoURL={photoURL}
                    price={price}
                    key={_id}
                  />
                )
              )}
          </Grid>
        </Stack>
      </section>
    </>
  );
};

export default Profile;
