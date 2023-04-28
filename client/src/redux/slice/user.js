import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    products: [],
    messages: [],
    loading: false, 
    error: false
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        //Update user
        UpdateUserStart (state) {
            state.loading = true
           },
           UpdateUserSuccess (state, action) {
            state.loading = false
            state.user = action.payload
            console.log('state', state.user)
           },
           UpdateUserFailure (state) {
            state.loading = false
            state.error = true
           },
        //get user's products
        getProductsStart(state) {
            state.loading = true;
            state.error = false;
        },   
        getProductsSuccess(state, action) {
            state.loading = false;
            state.products = action.payload
        },
        getProductsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        //Update product
        updateProductStart(state) {
            state.loading = true;
        },
        updateProductsSuccess(state, action) {
            state.loading = false;
            state.products[
                state.products.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.product
        },
        updateProductsFailure(state) {
            state.loading = false;
            state.error = true;
        },

        //Delete product
        deleteProductsStart(state) {
            state.loading = true;
            state.error = false;
        },
        deleteProductsSuccess(state, action) {
            state.loading = false;
            state.products.splice(
                state.products.findIndex((item) => item._id === action.payload.id),1
            )
        },
        deleteProductsFailure(state) {
            state.loading = false;
            state.error = true;
        },
    },
});

export const userAction = userSlice.actions;

export default userSlice;