import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentUser: null, isFetching: false, error: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // Login user
    loginStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess(state, action) {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Logout user
    logoutStart(state) {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.currentUser = null;
      localStorage.removeItem('persist:root')
      localStorage.clear()
      state.success = true; 
    },
    logoutFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice;
