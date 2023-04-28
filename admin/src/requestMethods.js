import axios from "axios";

const BASE_URL = "http://localhost:3001/api/admin";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
