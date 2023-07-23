import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authAction } from "../slice/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/admin/",
  credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState.auth.token;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
});

// const baseQueryWith = async(args, api, extraOption) => {
//     let result = await baseQuery(args, api, extraOption)

//     api.dispatch(authAction.loginSuccess({...result}))
//    result = await baseQuery(args, api, extraOption)
//    return result
// }


export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'auth'],
  endpoints: (builder) => ({}),
});
