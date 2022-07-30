import { Group } from "@mantine/core";
import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

type Props = {
  rating: number;
};

export default function Ratings({ rating }: Props) {
  const rounded = Math.round(rating);
  return (
    <Group>
      {Array<any>(rounded)
        .fill(<FaStar color="#ffcd3c" size="16" />)
        .map((x) => x)}
      {Array<any>(5 - rounded)
        .fill(<FaRegStar color="#ffcd3c" size="16" />)
        .map((x) => x)}
    </Group>
  );
}
