// atoms/cart.js
import { atom } from 'recoil';
import { Product } from "@/types";


export const cartState = atom({
  key: 'cartState',
  default: [] as Product[], // Initialize the cart as an empty array
});
