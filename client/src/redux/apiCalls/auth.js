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
        price: obj.data,
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
      query: (newPassword, currentPassword, passwordConfirm, id) => ({
        url: `/profile/updatePassword/${id}`,
        method: "PATCH",
        body: { id, newPassword, currentPassword, passwordConfirm },
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
        url: "/auth/google/google/callback",
        method: "GET",
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
  useGoogleSigninMutation,
} = userApiSlice;
