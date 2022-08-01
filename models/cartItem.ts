import { product } from "./product";

export interface cartItem extends product {
  quantity: number;
}
