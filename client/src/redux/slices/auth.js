import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  currentUser: null,
  product: null,
  messages: [],
  token: null,
  error: false,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerStart(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.success = true; 
    },
    registerFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    loginStart(state) {
      state.loading = true;
      state.error = false;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.success = true; 
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = true;
    },

    logoutStart(state) {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.token = null;
      state.currentUser = null;
      state.product = null;
      state.messages = null;
      localStorage.removeItem("persist:root");
      localStorage.clear();
      state.success = true; 
    },
    logoutFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    uploadProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    uploadProductSucess(state, action) {
      state.loading = false;
      state.product = action.payload;
      state.success = true; 
    },
    uploadProductFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateUserSucess(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
      state.success = true; 
    },
    updateUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getUsertProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUsertProductSeccess(state, action) {
      state.loading = false;
      state.product = action.payload;
      state.success = true;
    },
    getUsertProductFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateUserProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateUserProductSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
      state.success = true;
    },
    updateUserProductFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateUserPasswordStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateUserPasswordSuccess(state, action) {
      state.loading = false;
      state.success = true;
    },
    updateUserPasswordFailure(state, action) {
      state.loading = false;
      state.error = true;
    },

    deleteUserProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteUserProductsSuccess(state) {
      state.loading = false;
      state.product = null;
      state.success = true;
    },
    deleteUserProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice;
