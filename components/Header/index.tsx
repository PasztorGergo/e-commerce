import React, { useState, useEffect } from "react";
import {
  Anchor,
  Box,
  Burger,
  createStyles,
  Group,
  Header as H,
  MediaQuery,
  Stack,
  Title,
  Avatar,
  TextInput,
  Tabs,
  Button,
  Text,
  PasswordInput,
} from "@mantine/core";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { FaCartPlus } from "react-icons/fa";
import { useClickOutside } from "@mantine/hooks";
import { useAuth } from "../../context/AuthProvider";
import { openModal } from "@mantine/modals";
import { useForm } from "@mantine/form";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    alignItems: "center",
    border: "none",
    boxShadow: "0 0 .5rem rgba(0,0,0, .05)",
    [theme.fn.largerThan("sm")]: {
      padding: ".2rem 6rem",
    },
    [theme.fn.smallerThan("sm")]: {
      padding: ".2rem 0rem",
    },
    minHeight: "fit-content",
  },
  button: {
    backgroundColor: "#ff506e",
    "&:hover": {
      backgroundColor: theme.fn.darken("#ff506e", 0.05),
    },
  },
}));

export default function Header() {
  const { classes } = useStyles();
  const [isOpen, setOpen] = useState<boolean>(false);
  const controls = useAnimation();
  const ref = useClickOutside(() => setOpen(false));
  const { user, loginWithEmail, loginWithGoogle, register, loading }: any =
    useAuth();

  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm({
    initialValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });

  const modals = () => {
    openModal({
      title: "Login or Register Account",
      children: (
        <Group sx={{ width: "100%" }}>
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
                  onSubmit={loginForm.onSubmit((e) =>
                    loginWithEmail(e.email, e.password)
                  )}
                >
                  <TextInput
                    type="email"
                    label="E-mail address"
                    {...loginForm.getInputProps("email")}
                  />
                  <PasswordInput
                    label="Password"
                    {...loginForm.getInputProps("password")}
                  />
                  <Button
                    disabled={loading}
                    type="submit"
                    mt="xl"
                    className={classes.button}
                  >
                    Log In
                  </Button>
                </form>
              </Stack>
            </Tabs.Panel>
            <Tabs.Panel value="signup">
              <Stack mt="lg">
                <form
                  onSubmit={signupForm.onSubmit((e) => {
                    if (e.password != e.confirm) return;

                    register(e.email, e.password);
                  })}
                >
                  <TextInput
                    type="email"
                    label="E-mail address"
                    {...signupForm.getInputProps("email")}
                  />
                  <PasswordInput
                    label="Password"
                    {...signupForm.getInputProps("password")}
                  />
                  <PasswordInput
                    label="Confirm Password"
                    {...signupForm.getInputProps("confirm")}
                  />
                  <Button
                    disabled={loading}
                    type="submit"
                    mt="xl"
                    className={classes.button}
                  >
                    Sign Up
                  </Button>
                </form>
              </Stack>
            </Tabs.Panel>
          </Tabs>
        </Group>
      ),
    });
  };

  useEffect(() => {
    if (isOpen) {
      controls.start(() => ({ scaleY: 1, transformOrigin: "top" }));
    } else {
      controls.start(() => ({ scaleY: 0, transformOrigin: "top" }));
    }
  }, [controls, isOpen]);

  return (
    <H
      fixed
      height="10vh"
      sx={{ minHeight: "max-content" }}
      className={classes.header}
      ref={ref}
    >
      <MediaQuery styles={{ display: "none" }} largerThan="sm">
        <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
          <Group position="apart" sx={{ height: "100%" }} px="1rem">
            <Title order={3}>
              <Link href="/">
                <Anchor>Pastore</Anchor>
              </Link>
            </Title>
            <Burger
              sx={{ color: "#1E293B" }}
              opened={isOpen}
              onClick={() => setOpen((prev) => !prev)}
            />
          </Group>
          <motion.div
            animate={controls}
            initial={{ scaleY: 0 }}
            style={{ background: "white", width: "100%" }}
          >
            <Stack px="1rem">
              <Link href="/products">
                <Anchor>Products</Anchor>
              </Link>
              <Link href="/contants">
                <Anchor>Contants</Anchor>
              </Link>
              <Link href="/about">
                <Anchor>About</Anchor>
              </Link>
              <Link href="/cart">
                <Anchor>Cart</Anchor>
              </Link>
            </Stack>
          </motion.div>
        </Box>
      </MediaQuery>
      <MediaQuery styles={{ display: "none" }} smallerThan="sm">
        <Group sx={{ width: "100%" }} position="apart" align="center">
          <Title order={3}>
            <Link href="/">
              <Anchor>Pastore</Anchor>
            </Link>
          </Title>
          <Group sx={{ gap: "2rem" }}>
            <Link href="/products">
              <Anchor>Products</Anchor>
            </Link>
            <Link href="/contants">
              <Anchor>Contants</Anchor>
            </Link>
            <Link href="/about">
              <Anchor>About</Anchor>
            </Link>
            <Link href="/cart">
              <Anchor>
                <FaCartPlus />
              </Anchor>
            </Link>
            {user ? (
              <Link href="/profile">
                <Avatar
                  sx={{ cursor: "pointer" }}
                  radius="xl"
                  alt={user?.name}
                  src={user?.photoURL}
                  color="pink"
                />
              </Link>
            ) : (
              <Avatar
                onClick={modals}
                sx={{ cursor: "pointer" }}
                radius="xl"
                alt={user?.name}
                src={user?.photoURL}
                color="pink"
              />
            )}
          </Group>
        </Group>
      </MediaQuery>
    </H>
  );
}
