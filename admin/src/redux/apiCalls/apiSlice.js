import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://www.shareandride.site/api/admin/",
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'auth'],
  endpoints: (builder) => ({}),
});
