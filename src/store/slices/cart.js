import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    modifyCartDetails: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { modifyCartDetails } = cartSlice.actions;
export const cartSelector = (state) => state.cart;
const cartDetails = cartSlice.reducer;
export default cartDetails;
