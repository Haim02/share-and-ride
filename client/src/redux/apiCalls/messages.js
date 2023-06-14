import { apiSlice } from "./apiSlice";

export const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserMessages: builder.mutation({
      query: () => ({
        url: "/message/messages",
        method: "GET",
      }),
    }),
    getUserRequests: builder.mutation({
      query: () => ({
        url: "/message/requests",
        method: "GET",
      }),
    }),
    createMessage: builder.mutation({
      query: (data) => ({
        url: "/message/createMessage",
        method: "POST",
        body: data,
      }),
    }),
    updateMessage: builder.mutation({
      query: (data) => ({
        url: `/message/${data.id}`,
        method: "PATCH",
        body: data.updateStatus,
      }),
    }),
  }),
});

export const {
  useGetUserMessagesMutation,
  useGetUserRequestsMutation,
  useCreateMessageMutation,
  useUpdateMessageMutation,
} = messagesApiSlice;
