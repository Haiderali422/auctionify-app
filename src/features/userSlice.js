import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  displayName: null,
  photo: null,
  firebase_uid: null,
  created_at: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.firebase_uid = action.payload.firebase_uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.photo = action.payload.photo;
      state.created_at = action.payload.created_at;
    },
    Logout: (state) => {
      state.firebase_uid = null;
      state.email = null;
      state.displayName = null;
      state.photo = null;
    },
  },
});

export const { setUser, Logout } = userSlice.actions;
export default userSlice.reducer;
