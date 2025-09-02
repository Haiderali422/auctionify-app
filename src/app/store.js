import { configureStore } from '@reduxjs/toolkit';
import auctionReducer from '../features/auctionSlice';

export const store = configureStore({
  reducer: {
    auction: auctionReducer,
  },
});
