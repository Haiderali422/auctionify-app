import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginOpen: false,
  signUpOpen: false,
  loading: false,
  error: null,
  tokens: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  },
};

export const auctionSlice = createSlice({
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
    SET_ERROR: (state, action) => {
      state.error = action.payload;
    },
    SET_TOKENS: (state, action) => {
      state.tokens = action.payload;
      if (action.payload.accessToken) {
        localStorage.setItem('accessToken', action.payload.accessToken);
      }
      if (action.payload.refreshToken) {
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      }
    },
    CLEAR_AUTH: (state) => {
      state.user = null;
      state.tokens = {
        accessToken: null,
        refreshToken: null,
      };
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('firebaseUser');
    },
  },
});

export const { SET_LOGIN_OPEN, SET_LOADING, SET_SIGNUP_OPEN, SET_TOKENS, CLEAR_AUTH } =
  auctionSlice.actions;

export default auctionSlice.reducer;
