import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { IProduct } from "types/product";

export interface ICartState {
  products: IProduct[];
}

const products =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cart-products")) || []
    : [];

const initialState: ICartState = {
  products,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: ICartState, action: PayloadAction<IProduct>) => {
      console.log("addToCart");

      state.products = [...state.products, action.payload];
      if (typeof window !== "undefined")
        localStorage.setItem("cart-products", JSON.stringify(state.products));
    },
    removeFromCart: (state: ICartState, action: PayloadAction<string>) => {
      console.log("removeFromCart");

      state.products = state.products.filter(
        (prod) => prod.id !== action.payload
      );
      if (typeof window !== "undefined")
        localStorage.setItem("cart-products", JSON.stringify(state.products));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
