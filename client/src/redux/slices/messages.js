import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  requests: [],
  isFetching: false,
  error: false,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState: initialState,
  reducers: {
    //Get messages
    getMessagesStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getMessagesSuccess(state, action) {
      state.isFetching = false;
      state.messages = action.payload;
    },
    getMessagesFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Get messages
    getRequestsStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getRequestsSuccess(state, action) {
      state.isFetching = false;
      state.requests = action.payload;
    },
    getRequestsFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Create message
    createMessagesStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    createMessagesSuccess(state, action) {
      state.isFetching = false;
      state.messages.push(action.payload)
    },
    createMessagesFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Update message
    updateMessagesStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    updateMessagesSuccess(state, action) {
      state.isFetching = false;
      state.messages[
        state.messages.findIndex((item) => item._id === action.payload._id)
      ] = action.payload.product;
    },
    updateMessagesFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    clearState (state) {
      state.messages = null;
      state.requests = null;
    },
  },
});

export const messagesAction = messagesSlice.actions;

export default messagesSlice;
