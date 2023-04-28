// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { authSliceAction, signupUser } from "../redux/auth";
// import { publicRequest } from "../requestMethods";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:3000",
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithReasult = async (args, api, extraOption) => {
//   let result = await baseQuery(args, api, extraOption);

//   if (result?.error?.originalState === 403) {
//     console.log("sending refresh token");

//     const refreshResult = await baseQuery("/refresh", api, extraOption);

//     if (refreshResult?.data) {
//       const user = api.getState().auth.user;

//       // api.dispatch(setCreadentials({ ...refreshResult.data, user}))

//       result = await baseQuery(args, api, extraOption);
//     } else {
//       // api.dispatch(logOut())
//     }
//   }
//   return result;
// };

// export const login = async (dispatch, user) => {
//   dispatch(authSliceAction.loginStart());
//   try {
//     const res = await publicRequest.post("/auth/login", user);
//     console.log(res.data.user);
//     dispatch(authSliceAction.loginSuccess(res.data.data.user));
//   } catch (error) {
//     console.log(error.message);
//     dispatch(authSliceAction.loginFailure());
//   }
// };

// export const register = async (dispatch, user) => {
//   dispatch(authSliceAction.loginStart());
//   try {
//     const res = await publicRequest.post("/auth/register", user);
//     console.log(res.data.data.user);
//     dispatch(authSliceAction.loginSuccess(res.data.data.user));
//   } catch (error) {
//     console.log(error.message);
//     dispatch(authSliceAction.loginFailure());
//   }
// };

// export const logout = async (dispatch, user) => {
//   dispatch(authSliceAction.logoutStart());
//   try {
//     const res = await publicRequest.post("/auth/logout", user);
//     console.log(res.data.data);
//     dispatch(authSliceAction.loginSuccess(res.data.data));
//   } catch (error) {
//     console.log(error.message);
//     dispatch(authSliceAction.loginFailure());
//   }
// };
