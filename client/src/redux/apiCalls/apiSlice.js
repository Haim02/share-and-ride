import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api",
  credentials: "include",
});
console.log('mnmnm')

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['auth', 'product', 'message'],
  endpoints: (builder) => ({}),
});
