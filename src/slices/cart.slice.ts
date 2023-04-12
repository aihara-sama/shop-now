import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { IProduct } from "types/product";

type TProductWithAmount = IProduct & { amount: number };

export interface ICartState {
  products: TProductWithAmount[];
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
      state.products = [...state.products, { ...action.payload, amount: 1 }];
      if (typeof window !== "undefined")
        localStorage.setItem("cart-products", JSON.stringify(state.products));
    },
    removeFromCart: (state: ICartState, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (prod) => prod.id !== action.payload
      );
      if (typeof window !== "undefined")
        localStorage.setItem("cart-products", JSON.stringify(state.products));
    },
    addProductAmount: (state: ICartState, action: PayloadAction<string>) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload) product.amount += 1;
        return product;
      });
      if (typeof window !== "undefined")
        localStorage.setItem("cart-products", JSON.stringify(state.products));
    },
    decreaseProductAmount: (
      state: ICartState,
      action: PayloadAction<string>
    ) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload) product.amount -= 1;
        return product;
      });
      if (typeof window !== "undefined")
        localStorage.setItem("cart-products", JSON.stringify(state.products));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  addProductAmount,
  decreaseProductAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
