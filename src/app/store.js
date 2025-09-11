import { configureStore } from '@reduxjs/toolkit';
import auctionReducer from '../features/auctionSlice';
import userReducer from '../features/userSlice';
import itemsReducer from '../features/itemSlice';

export const store = configureStore({
  reducer: {
    auction: auctionReducer,
    user: userReducer,
    items: itemsReducer,
  },
});
