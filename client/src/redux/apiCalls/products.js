// import { publicRequest } from "../../requestMethods";
import { apiSlice } from "./apiSlice";
import axios from "axios";
import { productAction } from './../slices/products';
const URL = "http://localhost:3001/api/";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOneProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetOneProductMutation } = productsApiSlice;

export const getAllProducts = async (
  dispatch,
  page,
  limit,
  filtering,
  sorting
) => {
  dispatch(productAction.getProductsStart());
  try {
    const response = await axios.get(
      `http://localhost:3001/api/products/products?sort=price.${sorting}`,
      {
        params: {
          page: page,
          limit: limit,
          type: filtering.type,
          location: {
            city: filtering.city,
          },
        },
      }
    );
    dispatch(productAction.getProductsSuccess(response.data.products));
  } catch (error) {
    dispatch(productAction.getProductsFailure());
  }
};
