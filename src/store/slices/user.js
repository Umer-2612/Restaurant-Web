import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.info = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserInfo } = userSlice.actions;
export const userSelector = (state) => state.user;
const user = userSlice.reducer;
export default user;
