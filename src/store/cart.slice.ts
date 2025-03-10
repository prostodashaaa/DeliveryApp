import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export const CART_PERSISTENT_STATE = "cartData";

export interface CartItem {
  email: string;
  items: { id: number; count: number }[];
}

export interface CartState {
  users: CartItem[];
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? {
  users: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clean: (state, action: PayloadAction<string>) => {
      state.users = state.users.map((user) => {
        if (user.email == action.payload) {
          user.items = [];
        }
        return user;
      });
    },
    add: (state, action: PayloadAction<{ id: number; email: string }>) => {
      const user = state.users.find(
        (user) => user.email === action.payload.email
      );
      if (user) {
        const item = user.items.find((i) => i.id === action.payload.id);
        if (item) {
          item.count += 1;
        } else {
          user.items.push({ id: action.payload.id, count: 1 });
        }
      } else {
        state.users.push({
          email: action.payload.email,
          items: [{ id: action.payload.id, count: 1 }],
        });
      }
    },
    remove: (state, action: PayloadAction<{ id: number; email: string }>) => {
      const user = state.users.find(
        (user) => user.email === action.payload.email
      );
      if (user) {
        const item = user.items.find((i) => i.id === action.payload.id);
        if (item) {
          if (item.count > 1) {
            item.count -= 1;
          } else {
            user.items = user.items.filter((i) => i.id !== action.payload.id);
          }
        }
      }
    },
    delete: (state, action: PayloadAction<{ id: number; email: string }>) => {
      const user = state.users.find(
        (user) => user.email === action.payload.email
      );
      if (user) {
        user.items = user.items.filter((i) => i.id !== action.payload.id);
      }
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
