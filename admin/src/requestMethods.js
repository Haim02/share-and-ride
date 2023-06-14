import axios from "axios";

const URL = "http://localhost:3001/api/admin/";

export const publicRequest = axios.create({
  baseURL: URL,
  credentials: "include",
  withCredentials: true,
});
