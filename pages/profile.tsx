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
  Paper,
  Tabs,
  TextInput,
  PasswordInput,
  SimpleGrid,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { closeAllModals, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaCheck,
  FaGoogle,
  FaPlus,
  FaRegImage,
  FaTimes,
  FaUpload,
} from "react-icons/fa";
import { client } from "../app";
import { AddProduct, ProductCard } from "../components";
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
  const { user, loginWithEmail, loginWithGoogle, register, loading } =
    useAuth();
  const { classes } = useStyles();
  const products = useMemo(() => {
    if (user) {
      console.log(user.products);
      const getProducts =
        user?.products.length > 0 &&
        user?.products.map(
          async (id: string) =>
            (
              await client.query({
                query: gql`
    query GetProducts{
      product(query: {_id: "${id}"}){
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
            ).data.product
        );

      let resultArray: Array<any> = [];

      getProducts.map((x: any) =>
        x.then((y: any) => {
          resultArray.push(y);
        })
      );

      return resultArray;
    }
  }, [, user]);
  const [picture, setPicture] = useState<any>();
  const [isCreate, setCreate] = useState<boolean>(false);
  const router = useRouter();
  const loginEmail = useRef<any>();
  const loginPassword = useRef<any>();
  const signupEmail = useRef<any>();
  const signupPassword = useRef<any>();
  const signupConfirm = useRef<any>();
  const [ploading, setLoading] = useState<boolean>(false);

  const setPP = async () => {
    try {
      await client.mutate({
        mutation: gql`
        mutation UpdateProfilePicutre{
          updateOneUser( set:{photoURL: "${picture}"}, query: {uid: "${user.uid}"}){
            displayName
          }
        }
      `,
      });
      showNotification({
        message: "Successfully changed your picture",
        icon: <FaCheck />,
        color: "teal",
        autoClose: 3000,
      });
    } catch (error) {
      showNotification({
        message: "An error occured",
        icon: <FaTimes />,
        color: "red",
        autoClose: 3000,
      });
    }
  };

  const uploadPP = async () => {
    const fr = new FileReader();

    openModal({
      title: "Add new profile picture",
      children: (
        <Stack>
          <Dropzone
            onDrop={(f) => {
              setLoading(true);

              fr.onload = (e) => {
                if (e.target?.readyState === 2) {
                  //@ts-ignore
                  setPicture(e.target.result);
                  setLoading(false);
                }
              };
              fr.readAsDataURL(f[0]);
            }}
            accept={IMAGE_MIME_TYPE}
            sx={{
              background: "none",
              backgroundImage: picture ? `url("${picture}")` : "",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "40%",
            }}
          >
            <Group position="center" spacing="xl">
              <Dropzone.Accept>
                <FaUpload size={50} opacity={0.3} color="#FF506E" />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <FaTimes size={50} opacity={0.3} color="#FF506E" />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <FaRegImage size={50} opacity={0.3} color="#1E293B" />
              </Dropzone.Idle>
              {!picture && <Text>Drop your new profile picture here</Text>}
            </Group>
          </Dropzone>
          <Button
            leftIcon={<FaUpload />}
            className={classes.button}
            onClick={() => {
              setPP();
              closeAllModals();
            }}
            disabled={ploading}
          >
            Upload
          </Button>
        </Stack>
      ),
    });
  };

  return !!user ? (
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
              <Title order={2}>{user.displayName}</Title>
              <Text color="dimmed">{user.email}</Text>
            </Stack>
          </Group>
          {isCreate && <AddProduct />}
          <SimpleGrid cols={4} spacing="md">
            <Paper
              sx={{
                opacity: 0.7,
                borderWidth: ".3rem",
                borderStyle: "dashed",
                background: "none",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
              }}
              onClick={() => setCreate((prev) => !prev)}
              withBorder
              p="xl"
            >
              <Text>
                {isCreate ? "Close Product Creator" : "Add new product"}
              </Text>
              <FaPlus size={32} />
            </Paper>

            {
              //@ts-ignore
              products?.length > 0 &&
                //@ts-ignore
                products.map(
                  ({
                    _id,
                    name,
                    price,
                    rating,
                    description,
                    photoURL,
                  }: any) => (
                    <ProductCard
                      stripe_id=""
                      _id={_id}
                      name={name}
                      rating={rating}
                      description={description}
                      photoURL={photoURL}
                      price={price}
                      key={_id}
                      sx={{ height: "30vh", overflow: "hidden" }}
                    />
                  )
                )
            }
          </SimpleGrid>
        </Stack>
      </section>
    </>
  ) : (
    <>
      <Head>
        <title>Manage Profile | Pastore</title>
      </Head>
      <section
        className={classes.section}
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Group sx={{ width: "50%" }}>
          <Tabs defaultValue="login" sx={{ width: "100%" }}>
            <Tabs.List>
              <Tabs.Tab value="login">
                <Text weight="600">Log In</Text>
              </Tabs.Tab>
              <Tabs.Tab value="signup">
                <Text weight="600">Sign Up</Text>
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="login">
              <Stack mt="lg">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    loginWithEmail(
                      loginEmail.current.value,
                      loginPassword.current.value
                    );
                  }}
                >
                  <TextInput
                    ref={loginEmail}
                    type="email"
                    label="E-mail address"
                  />
                  <PasswordInput label="Password" ref={loginPassword} />
                  <Button
                    disabled={loading}
                    type="submit"
                    mt="xl"
                    className={classes.button}
                    onClick={() => closeAllModals()}
                  >
                    Log In
                  </Button>
                </form>
                <Text>or</Text>
                <Button
                  onClick={() => {
                    loginWithGoogle();
                    closeAllModals();
                  }}
                  leftIcon={<FaGoogle />}
                  className={classes.button}
                >
                  Sign in with Google
                </Button>
              </Stack>
            </Tabs.Panel>
            <Tabs.Panel value="signup">
              <Stack mt="lg">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    if (
                      signupPassword.current.value !=
                      signupConfirm.current.value
                    )
                      return;

                    register(
                      signupEmail.current.value,
                      signupPassword.current.value
                    );
                  }}
                >
                  <TextInput
                    type="email"
                    label="E-mail address"
                    ref={signupEmail}
                  />
                  <PasswordInput label="Password" ref={signupPassword} />
                  <PasswordInput label="Confirm Password" ref={signupConfirm} />
                  <Button
                    disabled={loading}
                    type="submit"
                    mt="xl"
                    onClick={() => closeAllModals()}
                    className={classes.button}
                  >
                    Sign Up
                  </Button>
                </form>
                <Text>or</Text>
                <Button
                  onClick={loginWithGoogle}
                  leftIcon={<FaGoogle />}
                  className={classes.button}
                >
                  Sign in with Google
                </Button>
              </Stack>
            </Tabs.Panel>
          </Tabs>
        </Group>
      </section>
    </>
  );
};

export default Profile;
