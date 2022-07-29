import { Button, Card, Image, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
  name: string;
  description: string;
  photoURL: string;
  url: string;
};

export default function FeaturedCard({
  name,
  description,
  photoURL,
  url,
}: Props) {
  const breakpoint = useMediaQuery("(min-width: 425px)", false);
  return (
    <Card sx={{ maxWidth: breakpoint ? "25vw" : "100%" }} shadow="sm">
      <Card.Section>
        <Image src={photoURL} />
      </Card.Section>
      <Card.Section p="xl">
        <Title order={5} mb="md">
          {name}
        </Title>
        <Text>{description}</Text>
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
          href={url}
        >
          See more
        </Button>
      </Card.Section>
    </Card>
  );
}
