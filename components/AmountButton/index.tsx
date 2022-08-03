import { Button, createStyles, Group, NumberInput } from "@mantine/core";
import React, { Ref, useCallback, useEffect, useMemo, useReducer } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "../../context/CartProvider";

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

type Props = {
  set: any;
  value?: number;
};

export default function AmountButton({ set, value }: Props) {
  const reducer = useCallback((state: number, action: "add" | "remove") => {
    if (action === "remove" && state - 1 === 0) {
      return 1;
    }

    switch (action) {
      case "add":
        return state + 1;
      case "remove":
        return state - 1;
    }
  }, []);

  const { classes } = useStyles();
  const [amount, dispatch] = useReducer(reducer, value || 1);

  useEffect(() => {
    set(amount);
  }, [amount]);

  return (
    <Group noWrap position="center" align="stretch" sx={{ gap: "0" }}>
      <Button
        className={`${classes.button} ${classes.amount}`}
        onClick={() => dispatch("remove")}
      >
        <FaMinus />
      </Button>
      <NumberInput
        onChange={() => set(amount)}
        defaultValue={1}
        value={value || amount}
        placeholder="Amount"
        variant="unstyled"
        hideControls
        //@ts-ignore
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
        onClick={() => dispatch("add")}
      >
        <FaPlus />
      </Button>
    </Group>
  );
}
