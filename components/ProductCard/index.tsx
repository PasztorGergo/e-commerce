import { Card, Image, Title, Text, createStyles, Group } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { product } from "../../models";
import Ratings from "../Ratings";

const useStyles = createStyles((theme) => ({
  card: {
    [theme.fn.largerThan("sm")]: {
      width: "20rem",
    },
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
    cursor: "pointer",
  },
}));

interface Porps extends product {
  sx?: any;
}

export default function ProductCard({
  _id,
  description,
  name,
  photoURL,
  price,
  rating,
  sx,
}: Porps) {
  const { classes } = useStyles();
  return (
    <Link href={`/products/${name?.toLowerCase().replaceAll(" ", "-")}`}>
      <Card shadow="sm" className={classes.card}>
        <Card.Section>
          <Image sx={sx} src={photoURL} alt={name} />
        </Card.Section>
        <Card.Section p="md">
          <Title order={3}>
            {name
              ?.split("-")
              .map(
                (current) => current.charAt(0).toUpperCase() + current.slice(1)
              )
              .join(" ")}
          </Title>
          <Group position="apart" my="lg">
            <Ratings rating={rating} />
            <Group grow position="left" align="flex-start">
              <Text size="lg">${price?.toString().split(".")[0]}</Text>
              <Text align="left" size="sm">
                {(price?.toString().split(".")[1] || "00").substring(0, 2)}
              </Text>
            </Group>
          </Group>
          <Text color="dimmed">{description}</Text>
        </Card.Section>
      </Card>
    </Link>
  );
}
