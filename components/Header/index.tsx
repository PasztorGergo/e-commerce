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
} from "@mantine/core";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { FaCartPlus } from "react-icons/fa";

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
}));

export default function Header() {
  const { classes } = useStyles();
  const [isOpen, setOpen] = useState<boolean>(false);
  const controls = useAnimation();

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
          </Group>
        </Group>
      </MediaQuery>
    </H>
  );
}
