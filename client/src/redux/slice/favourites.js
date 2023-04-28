import { createSlice } from "@reduxjs/toolkit";

const initialState = {products:[]};

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState: initialState,
    reducers: {
        add(state, action) {
            state.push(action.payload)
        },

        remove(state, action) {
            state.products = state.products.filter(item => item.id !== action.payload)
        },

        reset(state) {
            state.products = []
        }
    }
});

export const favouritesAction = favouritesSlice.actions;

export default favouritesSlice