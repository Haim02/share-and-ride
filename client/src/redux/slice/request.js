import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    requests: [],
    isFetching: false, 
    error: false
};

const requestsSlice = createSlice({
    name: 'messages',
    initialState: initialState,
    reducers: {
        //Get requests
        getrequestsStart(state) {
            state.isFetching = true;
            state.error = false;
        },
        getrequestsSuccess(state, action) {
            state.isFetching = false;
            state.requests = action.payload;
        },
        getrequestsFailure(state) {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const requestsAction = requestsSlice.actions;

export default requestsSlice;