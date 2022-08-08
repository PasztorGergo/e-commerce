import { Group, Paper, Image, Stack, Title, Text, Button } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useCart } from "../../context/CartProvider";
import { cartItem } from "../../models";
import AmountButton from "../AmountButton";

export default function CartItem({
  _id,
  name,
  photoURL,
  price,
  quantity,
}: cartItem) {
  const [amount, setAmount] = useState<number>(quantity);
  const { setQuantity, removeFromCart } = useCart();

  useEffect(() => {
    if (_id && amount)
      setQuantity({ _id, name, photoURL, price, quantity }, amount);
  }, [amount]);

  return (
    <Paper
      withBorder
      shadow="sm"
      sx={{ width: "100%", maxHeight: "min-content" }}
      p="lg"
    >
      <Group position="apart" align="center">
        <Group>
          <Image src={photoURL} alt={name} height="20vh" />
          <Stack>
            <Title order={4} sx={{ whiteSpace: "pre-wrap" }}>
              {name
                ?.split("-")
                .map(
                  (current: any) =>
                    current.charAt(0).toUpperCase() + current.slice(1)
                )
                .join(" ")}
            </Title>
            <AmountButton value={quantity} set={setAmount} />
          </Stack>
        </Group>
        <Button
          sx={(theme) => ({
            background: "#FF506E",
            "&:hover": {
              background: theme.fn.darken("#FF506E", 0.05),
            },
          })}
          rightIcon={<FaTrash />}
          onClick={() =>
            removeFromCart({ _id, price, quantity, name, photoURL })
          }
        >
          Remove
        </Button>
        <Group grow position="left" align="flex-start">
          <Text size="lg">
            ${(price * quantity)?.toString()?.split(".")[0]}
          </Text>
          <Text align="left" size="sm">
            {(price * quantity)?.toString().split(".")[1]?.substring(0, 2)}
          </Text>
        </Group>
      </Group>
    </Paper>
  );
}
