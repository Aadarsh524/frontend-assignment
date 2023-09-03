// atoms/cart.js
import { atom } from 'recoil';
import { Product } from "@/types";

//cartState 
export const cartState = atom({
  key: 'cartState',
  default: [] as Product[], // Initialize the cart as an empty array
});
