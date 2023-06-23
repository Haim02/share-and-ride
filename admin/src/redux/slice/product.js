import { createSlice } from "@reduxjs/toolkit";

const initialProductState = {
  products: [],
  lastRents: [],
  product: null,
  isFetching: false,
  isFetchingLastRents: false,
  error: false,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    //Get All Products
    getProductsStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getProductsSuccess(state, action) {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductsFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Get One Product
    getProductStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess(state, action) {
      state.isFetching = false;
      state.product = action.payload;
    },
    getProductFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Delete Product
    deleteProductStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess(state, action) {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload)
      );
    },
    deleteProductFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Update Product
    updateProductsStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    updateProductsSuccess(state, action) {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload._id)
      ] = action.payload.product;
    },
    updateProductsFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Post Product
    addProductsStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    addProductsSuccess(state, action) {
      state.isFetching = false;
      state.products.push(action.payload);
    },
    addProductsFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Get lastRents Product
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
      state.products = null;
      state.lastRents = null;
      state.product = null;
    },
  },
});

export const productAction = productSlice.actions;
export default productSlice;
