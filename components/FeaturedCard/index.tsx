import { Button, Card, Group, Image, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { featured } from "../../models";
import Ratings from "../Ratings";

export default function FeaturedCard({
  name,
  photoURL,
  price,
  rating,
}: featured) {
  const breakpoint = useMediaQuery("(min-width: 963px)", false);
  return (
    <Card
      sx={{
        maxWidth: breakpoint ? "25vw" : "100%",
        height: "100%",
      }}
      shadow={breakpoint ? "sm" : "none"}
    >
      <Card.Section sx={{ display: "flex", justifyContent: "center" }}>
        <Image
          src={photoURL}
          alt={name}
          height={breakpoint ? "100%" : "10rem"}
          width={breakpoint ? "100%" : "10rem"}
        />
      </Card.Section>
      <Card.Section p="xl">
        <Title order={5}>
          {name
            .split("-")
            .map(
              (current) => current.charAt(0).toUpperCase() + current.slice(1)
            )
            .join(" ")}
        </Title>
        <Group position="apart" align="center" sx={{ width: "100%" }}>
          <Ratings rating={rating} />

          <Text>${price}</Text>
        </Group>
      </Card.Section>
      <Card.Section p="xl">
        <Button
          rightIcon={<FaSearch />}
          sx={(theme) => ({
            backgroundColor: "#ff506e",
            "&:hover": {
              backgroundColor: theme.fn.darken("#ff506e", 0.05),
            },
          })}
          component="a"
          href={`/products/${name}`}
        >
          See more
        </Button>
      </Card.Section>
    </Card>
  );
}
