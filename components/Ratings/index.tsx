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
        .fill("")
        .map((x, i: number) => (
          <FaStar cursor="pointer" key={i} color="ffcd3c" size={16} />
        ))}
      {Array<any>(5 - rounded)
        .fill("")
        .map((x, i: number) => (
          <FaRegStar cursor="pointer" key={i} color="ffcd3c" size={16} />
        ))}
    </Group>
  );
}
