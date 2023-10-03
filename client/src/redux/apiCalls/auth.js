import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        credentials: "include",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/auth/signup`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    checkToken: builder.mutation({
      query: (token) => ({
        url: "/auth/checkToken",
        method: "POST",
        body: token,
      }),
    }),
    getUsertProduct: builder.mutation({
      query: (id) => ({
        url: `/profile/userProduct/${id}`,
        method: "GET",
      }),
    }),
    uploadProduct: builder.mutation({
      query: (data) => ({
        url: "/products/createProduct",
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (obj) => ({
        url: `/profile/user/${obj.id}`,
        method: "PATCH",
        body: obj.data,
      }),
    }),
    updateUserProduct: builder.mutation({
      query: (obj) => ({
        url: `/profile/userProduct/${obj.id}`,
        method: "PATCH",
        body: obj.data,
      }),
    }),
    updateUserPassword: builder.mutation({
      query: (obj) => ({
        url: `/profile/updatePassword/${obj.id}`,
        method: "PATCH",
        body: obj.data,
      }),
    }),
    deleteUserProduct: builder.mutation({
      query: (id) => ({
        url: `/profile/userProduct/${id}`,
        method: "DELETE",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgotPassword",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (reset) => ({
        url: `/auth/resetPassword/${reset.token}`,
        method: "PATCH",
        body: reset.password,
      }),
    }),
    googleSignin: builder.mutation({
      query: () => ({
        url: "/auth/google/login/success",
        credentials: "include",
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/profile/user/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUsertProductMutation,
  useUploadProductMutation,
  useUpdateUserMutation,
  useUpdateUserProductMutation,
  useUpdateUserPasswordMutation,
  useForgotPasswordMutation,
  useDeleteUserProductMutation,
  useResetPasswordMutation,
  useCheckTokenMutation,
  useGoogleSigninMutation,
  useDeleteUserMutation,
} = userApiSlice;
