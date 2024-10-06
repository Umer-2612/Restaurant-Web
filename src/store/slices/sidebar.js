import { createSlice } from '@reduxjs/toolkit';

import { menuData } from 'components/sidebar/menuData';

const initialState = {
  sideBarItems: [...menuData],
};

export const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState,
});

export const sideBarItemSelector = (state) => state.sidebar.sideBarItems;

const sideBar = sideBarSlice.reducer;
export default sideBar;
