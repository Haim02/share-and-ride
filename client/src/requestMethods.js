import axios from "axios";

const URL = "http://localhost:3001/";

export const publicRequest = axios.create(
  {
    baseURL: URL,
    credentials: "include",
  }.credentials.includes
);

export const userRequest = axios.create(
  {
    baseURL: URL,
    credentials: "include",
  }.credentials.includes
);
