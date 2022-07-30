import React, { useState } from "react";
import { createStyles, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import FeaturedCard from "../FeaturedCard";
import { featured } from "../../models";

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
          {featured.map(({ _id, photoURL, name, price, rating }, i: number) => (
            <FeaturedCard
              price={price}
              rating={rating}
              name={name}
              photoURL={photoURL}
              key={_id}
              _id={_id}
            />
          ))}
        </Group>
      ) : (
        <Carousel loop>
          {featured.map(({ _id, photoURL, name, price, rating }, i: number) => (
            <Carousel.Slide key={_id}>
              <FeaturedCard
                price={price}
                rating={rating}
                name={name}
                photoURL={photoURL}
                _id={_id}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </section>
  );
}
