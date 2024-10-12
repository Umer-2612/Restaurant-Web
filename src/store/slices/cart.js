import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    modifyCartDetails: (state, action) => {
      if (Array.isArray(action.payload)) {
        return action.payload;
      }
      return state;
    },
  },
});

// Action creators
export const { modifyCartDetails } = cartSlice.actions;
export const cartSelector = (state) => state.cart;
export default cartSlice.reducer;
