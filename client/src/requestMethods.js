import axios from "axios";

const URL = "http://localhost:3001/api/";
console.log('ppp')
export const publicRequest = axios.create({
  baseURL: URL,
  withCredentials: true,
});
