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
    setUserAddress: (state, action) => {
      state.address = action.payload;
      return state;
    },
    setUserExperience: (state, action) => {
      state.experience = action.payload;
      return state;
    },
    setUserEducation: (state, action) => {
      state.education = action.payload;
      return state;
    },
    updateUserCompany: (state, action) => {
      state.info = {
        ...state.info,
        company: action.payload,
      };
    },
    updateCompanyPlan: (state, action) => {
      state.info = {
        ...state.info,
        company: {
          ...state.info.company,
          plan: { ...action.payload },
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserInfo,
  setUserAddress,
  setUserExperience,
  setUserEducation,
  updateUserCompany,
  updateCompanyPlan,
} = userSlice.actions;
export const userSelector = (state) => state.user;
const user = userSlice.reducer;
export default user;
