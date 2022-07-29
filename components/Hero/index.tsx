import React from "react";
import { createStyles, Group, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  section: {
    [theme.fn.largerThan("sm")]: {
      padding: ".2rem 6rem",
    },
    [theme.fn.smallerThan("sm")]: {
      padding: ".2rem 1rem",
    },
    marginTop: "15vh",
    height: "90vh",
    display: "flex",
    alignItems: "center",
  },
}));

export default function Hero() {
  const { classes } = useStyles();
  return (
    <section className={classes.section}>
      <Group sx={{ justifyContent: "space-between", width: "100%" }}>
        <Stack>
          <Title>From Developers to Developers</Title>
          <Text>
            Find yours from the +1000 of products that is sold by other
            Developers!
          </Text>
        </Stack>
        <Image
          src="/images/online-shopping-mobile-phone.svg"
          width={400}
          height={400}
        />
      </Group>
    </section>
  );
}
