import { createSlice } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import { purgeStoredState } from "redux-persist";
// import { persistor } from "./../store";

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
    // register user
    registerStart(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.success = true; // registration successful
    },
    registerFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // login user
    loginStart(state) {
      state.loading = true;
      state.error = false;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.success = true; // login successful
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = true;
    },

    // logout user
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

    // upload product
    uploadProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    uploadProductSucess(state, action) {
      state.loading = false;
      state.product = action.payload;
      state.success = true; // upload successful
    },
    uploadProductFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      // state.error = action.payload
    },

    // Update user
    updateUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateUserSucess(state, action) {
      state.loading = false;
      state.currentUser = action.payload;
      state.success = true; // Logout successful
    },
    updateUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Get user's product
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

    // Update user products
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

    // Update user password
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

    // Delete user products
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
