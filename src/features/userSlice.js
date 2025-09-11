import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  email: null,
  displayName: null,
  photo: null,
};
const savedUser = JSON.parse(localStorage.getItem('user'));
if (savedUser) {
  initialState.id = savedUser.id;
  initialState.email = savedUser.email;
  initialState.displayName = savedUser.name || savedUser.displayName;
  initialState.photo = savedUser.photoURL || savedUser.photo;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName || action.payload.name;
      state.photo = action.payload.photo || action.payload.photoURL;
    },
    clearUser: (state) => {
      state.id = null;
      state.email = null;
      state.displayName = null;
      state.photo = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
