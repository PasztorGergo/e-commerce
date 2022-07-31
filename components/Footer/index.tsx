import React from "react";
import {
  createStyles,
  Footer as F,
  Group,
  Title,
  Text,
  Stack,
  TextInput,
  Button,
} from "@mantine/core";
import { FaCheck, FaEnvelope } from "react-icons/fa";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  footer: {
    [theme.fn.largerThan("sm")]: {
      padding: "2rem 6rem",
    },
    [theme.fn.smallerThan("sm")]: {
      padding: "2rem 1rem",
    },
    position: "relative",
    background: "#1E293B",
    border: "none",
    "& *:not(input)": {
      color: "#F1F5F9 !important",
    },
  },
  form: {
    display: "flex",
    gap: "0.5rem",
    flexDirection: "column",
    alignItems: "start",
  },
  button: {
    background: "#FF506E",
    "&:hover": {
      background: theme.fn.darken("#FF506E", 0.05),
    },
  },
}));

export default function Footer() {
  const form = useForm({
    initialValues: {
      email: "",
    },
  });
  const { classes } = useStyles();

  const newsletterSubscription = () =>
    showNotification({
      id: "newsletter",
      message: "You've just successfully subscribed!",
      title: "Newsletter",
      color: "teal",
      autoClose: 3000,
      icon: <FaCheck size={16} />,
    });
  return (
    <F height="fit-content" className={classes.footer}>
      <Group>
        <Stack>
          <Title order={2}>Always be up to date</Title>
          <Text>
            Subrice to our newsletter and receive the best deals every week!
          </Text>
          <form
            className={classes.form}
            onSubmit={form.onSubmit(({ email }) => newsletterSubscription())}
          >
            <TextInput
              type="email"
              label="E-mail Address"
              placeholder="exapmle@example.com"
              {...form.getInputProps("email")}
            />
            <Button
              type="submit"
              className={classes.button}
              rightIcon={<FaEnvelope size={16} />}
            >
              Subscribe
            </Button>
          </form>
        </Stack>
      </Group>
      <Text color="dimmed" align="center" mt="lg">
        <strong>Pastore</strong> &copy;{new Date().getFullYear()} | All rights
        reserved
      </Text>
    </F>
  );
}
