import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: '',
  userEmail: '',
};
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: '',
    isLoggedIn: false,
    initialState,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = '';
      state.isLoggedIn = false;
    },
    setUserLogOutState: (state, action) => {
      state.userName = '';
      state.userEmail = '';
      state.isLoggedIn = false;
    },
    setActiveUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.isLoggedIn = true;
    },
  },
});

export const { login, logout, setActiveUser, setUserLogOutState } =
  userSlice.actions;

// selectors
export const selectUser = (state) => state.user.user;
export const selectUserName = (state) => state.user.userName;
export const selectUserEmail = (state) => state.user.userEmail;
export default userSlice.reducer;
