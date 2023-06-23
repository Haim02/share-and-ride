import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  users: [],
  lastRents: [],
  user: null,
  isFetching: false,
  isFetchingLastRents: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    loginStart(state) {
      state.isFetching = true;
    },
    loginSuccess(state, action) {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure(state) {
      state.isFetching = false;
      state.error = true;
    },
    loout(state) {
      state.currentUser = null;
    },

    //Get All Users
    getUsersStart(state) {
      state.isFetching = true;
    },
    getUsersSuccess(state, action) {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUsersFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Get One User
    getUserStart(state) {
      state.isFetching = true;
    },
    getUserSuccess(state, action) {
      state.isFetching = false;
      state.user = action.payload;
    },
    getUserFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Post User
    addUserStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    addUserSuccess(state, action) {
      state.isFetching = false;
      state.users.push(action.payload);
    },
    addUserFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Update User
    updateUserStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess(state, action) {
      state.isFetching = false;
      state.users[
        state.users.findIndex((user) => user._id === action.payload._id)
      ] = action.payload.user;
    },
    updateUserFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Delete User
    deleteUserStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserSuccess(state, action) {
      state.isFetching = false;
      state.users.splice(
        state.users.findIndex((user) => user._id === action.payload)
      );
    },
    deleteUserFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Get lastRents User
    lastRentsStart(state) {
      state.isFetchingLastRents = true;
      state.error = false;
    },
    lastRentsSuccess(state, action) {
      state.isFetchingLastRents = false;
      state.lastRents = action.payload;
    },
    lastRentsFailure(state) {
      state.isFetchingLastRents = false;
      state.error = true;
    },

    clearState (state) {
      state.users = null;
      state.lastRents = null;
      state.user = null;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
