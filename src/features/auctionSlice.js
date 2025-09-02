import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginOpen: false,
  signUpOpen: false,
  loading: false,
  user: null,
  error: null,
};

export const counterSlice = createSlice({
  name: 'auction',
  initialState,
  reducers: {
    SET_LOGIN_OPEN: (state, action) => {
      state.loginOpen = action.payload;
    },
    SET_SIGNUP_OPEN: (state, action) => {
      state.signUpOpen = action.payload;
    },
    SET_LOADING: (state, action) => {
      state.loading = action.payload;
    },
    SET_USER: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { SET_LOGIN_OPEN, SET_LOADING, SET_SIGNUP_OPEN } = counterSlice.actions;

export default counterSlice.reducer;
