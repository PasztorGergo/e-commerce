import React, { useState } from "react";
import { createStyles, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import FeaturedCard from "../FeaturedCard";

const useStyles = createStyles((theme) => ({
  section: {
    width: "100%",
    background: "#475569",
    [theme.fn.largerThan("sm")]: {
      padding: "2rem 6rem",
    },
    [theme.fn.smallerThan("sm")]: {
      padding: "2rem 1rem",
    },
  },
}));

type featured = {
  _id: string;
  photoURL: string;
  name: string;
  description: string;
  url: string;
};

type props = {
  featured: Array<featured>;
};

export default function Featured({ featured }: props) {
  const breakpoint = useMediaQuery("(min-width: 425px)", false);
  const [page, setPage] = useState<number>(1);
  const { classes } = useStyles();

  return (
    <section className={classes.section}>
      {breakpoint ? (
        <Group>
          {featured.map(
            ({ _id, photoURL, name, description, url }, i: number) => (
              <FeaturedCard
                description={description}
                name={name}
                photoURL={photoURL}
                key={_id}
                url={url}
              />
            )
          )}
        </Group>
      ) : (
        <Carousel>
          <Carousel.Slide></Carousel.Slide>
          <Carousel.Slide></Carousel.Slide>
          <Carousel.Slide></Carousel.Slide>
          <Carousel.Slide></Carousel.Slide>
          <Carousel.Slide></Carousel.Slide>
        </Carousel>
      )}
    </section>
  );
}
