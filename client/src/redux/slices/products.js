import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: null,
  isFetching: false,
  error: false,
};

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    //Get products
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

    //Get product
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

    //Add product
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

    //Update product
    updateProductsStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    updateProductsSuccess(state, action) {
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },
    updateProductsImagesSuccess(state, action) {
      state.product.images = state.product.images.filter((img) =>  img !== action.payload)
    },
    updateProductsFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Delete product
    deleteProductsStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductsSuccess(state, action) {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload.id),
        1
      );
    },
    deleteProductsFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    clearState (state) {
      state.product = null;
      state.products = null;
    },
  },
});

export const productAction = productSlice.actions;

export default productSlice;
