import axios from 'axios';
import { publicRequest, userRequest } from '../../requestMethods';
import { productAction } from '../slice/products'
import { useSelector } from 'react-redux';

export const getAllProducts = async (dispatch, page, limit, filtering, sorting) => {
        dispatch(productAction.getProductsStart());
        try {
             const response = await publicRequest.get(`/api/products/products?sort=${sorting}`, {
                params: {
                    page: page,
                    limit: limit,
                    type: filtering.type,
                    location:{
                    city: filtering.city
                    },
                    // sort: `${sorting.date},${sorting.dailyPrice},${sorting.hourPrice}`
                }
             })
          dispatch(productAction.getProductsSuccess(response.data.products));
        } catch (error) {
          dispatch(productAction.getProductsFailure());
        }
      };    

export const getOneProduct = async (dispatch, id) => { 
        dispatch(productAction.getProductStart());
        console.log('1')
        try {
             const response = await publicRequest.get(`/api/products/${id}`);
             console.log('api', response.data.product)
          dispatch(productAction.getProductSuccess(response.data.product));
        } catch (error) {
          dispatch(productAction.getProductFailure());
        }
      };      

export const addProducts = async (product, dispatch) => {
        dispatch(productAction.addProductsStart());
        try {
          const response = await publicRequest.post('/api/products/createProduct', product);
          dispatch(productAction.addProductsSuccess(response.data.data.products));
        } catch (error) {
          console.log(error.message);
          dispatch(productAction.addProductsFailure());
        }
      }; 
      
export const updateProduct = async (id, product, dispatch) => {
        dispatch(productAction.updateProductsStart());
        try {
          const response = await publicRequest.patch(`/api/products/${id}`, product);
          console.log(response)
          dispatch(productAction.updateProductsSuccess({ id: id, product: product}));
        } catch (error) {
          console.log(error.message);
          dispatch(productAction.updateProductsFailure());
        }
      };   
      
export const deleteImageProducts = async (id, dispatch, img) => {
        dispatch(productAction.deleteProductsStart());
        try {
          const response = await publicRequest.get(`/api/products/deletImage/${id}`, img);
          console.log(response)
          dispatch(productAction.deleteProductsSuccess(id));
        } catch (error) {
          console.log(error.message);
          dispatch(productAction.deleteProductsFailure());
        }
      };    

export const deleteProducts = async (id, dispatch) => {
        dispatch(productAction.deleteProductsStart());
        try {
          const response = await publicRequest.delete(`/api/products/${id}`);
          console.log(response)
          dispatch(productAction.deleteProductsSuccess(id));
        } catch (error) {
          console.log(error.message);
          dispatch(productAction.deleteProductsFailure());
        }
      };          
