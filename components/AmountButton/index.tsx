import { Button, createStyles, Group, NumberInput } from "@mantine/core";
import React, { useReducer } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const useStyles = createStyles((theme) => ({
  button: {
    background: "#FF506E",
    "&:hover": {
      background: theme.fn.darken("#FF506E", 0.05),
    },
  },
  amount: {
    minHeight: "100%",
    "&:first-child": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    "&:last-child": {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
}));

const reducer = (state: number, action: "add" | "remove") => {
  if (action === "remove" && state - 1 === 0) {
    return 1;
  }

  switch (action) {
    case "add":
      return state + 1;
    case "remove":
      return state - 1;
  }
};

export default function AmountButton() {
  const { classes } = useStyles();
  const [amount, dispatch] = useReducer(reducer, 1);
  return (
    <Group noWrap position="center" align="stretch" sx={{ gap: "0" }}>
      <Button
        className={`${classes.button} ${classes.amount}`}
        onClick={() => dispatch("add")}
      >
        <FaPlus />
      </Button>
      <NumberInput
        defaultValue={1}
        value={amount}
        placeholder="Amount"
        variant="unstyled"
        hideControls
        sx={{
          maxWidth: "5rem",
          background: "#fff",
          "& *": {
            textAlign: "center !important",
          },
        }}
      />
      <Button
        className={`${classes.button} ${classes.amount}`}
        onClick={() => dispatch("remove")}
      >
        <FaMinus />
      </Button>
    </Group>
  );
}
