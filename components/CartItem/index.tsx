import { Group, Paper, Image, Stack, Title, Text } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
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
  const { setQuantity } = useCart();

  return (
    <Paper withBorder shadow="sm" sx={{ width: "100%", maxHeight: "30vh" }}>
      <Group position="apart" align="center">
        <Group>
          <Image src={photoURL} alt={name} />
          <Stack>
            <Title order={4}>{name}</Title>
            <AmountButton set={setAmount} />
          </Stack>
        </Group>
        <Group align="start" position="center">
          <Text size="lg">${price?.toString().split(".")[0]}</Text>
          <Text size="sm">{price?.toString().split(".")[1]}</Text>
        </Group>
      </Group>
    </Paper>
  );
}
