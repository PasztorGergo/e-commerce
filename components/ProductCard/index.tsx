import { Card, Image, Title, Text, createStyles } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { product } from "../../models";

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

export default function index({
  _id,
  description,
  name,
  photoURL,
  price,
  rating,
}: product) {
  const { classes } = useStyles();
  return (
    <Link href={`/products/${name.toLowerCase().replaceAll(" ", "-")}`}>
      <Card shadow="sm" className={classes.card}>
        <Card.Section>
          <Image src={photoURL} />
        </Card.Section>
        <Card.Section p="md">
          <Title order={3}>{name}</Title>
          <Text color="dimmed">{description}</Text>
        </Card.Section>
      </Card>
    </Link>
  );
}