import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
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
      state.id = action.payload.id;
      state.firebase_uid = action.payload.firebase_uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName || action.payload.name;
      state.photo = action.payload.photo || action.payload.photoURL;
      state.created_at = action.payload.created_at;
    },
    logout: (state) => {
      state.firebase_uid = null;
      state.email = null;
      state.displayName = null;
      state.photo = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
