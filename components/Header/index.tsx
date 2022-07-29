import React, { useState } from "react";
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
      padding: ".2rem 1rem",
    },
  },
}));

export default function Header() {
  const { classes } = useStyles();
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <H fixed height="10vh" className={classes.header}>
      <MediaQuery styles={{ display: "none" }} largerThan="sm">
        <Group>
          <Title order={3}>
            <Link href="/">
              <Anchor>Pastore</Anchor>
            </Link>
          </Title>
          <Burger opened={isOpen} onClick={() => setOpen((prev) => !prev)} />
          {isOpen && (
            <Stack>
              <Link href="/products">
                <Anchor>Products</Anchor>
              </Link>
              <Link href="/about">
                <Anchor>About</Anchor>
              </Link>
              <Link href="/contact">
                <Anchor>Contact</Anchor>
              </Link>
            </Stack>
          )}
        </Group>
      </MediaQuery>
      <MediaQuery styles={{ display: "none" }} smallerThan="sm">
        <Group grow sx={{ width: "100%" }}>
          <Title order={3}>
            <Link href="/">
              <Anchor>Pastore</Anchor>
            </Link>
          </Title>
          <Group position="right">
            <Link href="/products">
              <Anchor>Products</Anchor>
            </Link>
            <Link href="/about">
              <Anchor>About</Anchor>
            </Link>
            <Link href="/contact">
              <Anchor>Contact</Anchor>
            </Link>
          </Group>
        </Group>
      </MediaQuery>
    </H>
  );
}
