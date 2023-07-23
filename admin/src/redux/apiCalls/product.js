import { productAction } from "../slice/product";
import axios from 'axios';
// import { publicRequest } from "../../requestMethods";
const URL = "/api/admin/products";

export const publicRequest = axios.create({
  baseURL: URL,
});

export const getProducts = async (dispatch) => {
  dispatch(productAction.getProductsStart());
  try {
    const response = await publicRequest.get("");
    dispatch(productAction.getProductsSuccess(response.data.products));
  } catch (error) {
    dispatch(productAction.getProductsFailure());
  }
};

export const getOneProduct = async (id, dispatch) => {
  dispatch(productAction.getProductStart());
  try {
    const response = await publicRequest.get(`/${id}`);
    dispatch(productAction.getProductSuccess(response.data.product));
  } catch (error) {
    dispatch(productAction.getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(productAction.deleteProductStart());
  try {
    const response = await publicRequest.delete(`/${id}`);
    dispatch(productAction.deleteProductSuccess(id));
  } catch (error) {
    dispatch(productAction.deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(productAction.updateProductsStart());
  try {
    const response = await publicRequest.patch(`/${id}`, product);
    dispatch(productAction.updateProductsSuccess(response.data.product));
  } catch (error) {
    dispatch(productAction.updateProductsFailure());
  }
};

export const addProducts = async (product, dispatch) => {
  dispatch(productAction.addProductsStart());
  try {
    const response = await publicRequest.post(
      "/products/createProduct",
      product
    );
    dispatch(productAction.addProductsSuccess(response.data.products));
  } catch (error) {
    dispatch(productAction.addProductsFailure());
  }
};

export const getProductLastRents = async (id, dispatch) => {
  dispatch(productAction.lastRentsStart());
  try {
    const response = await publicRequest.get(`/lastRents/${id}`);
    dispatch(productAction.lastRentsSuccess(response.data.lastRents));
  } catch (error) {
    dispatch(productAction.lastRentsFailure());
  }
};
