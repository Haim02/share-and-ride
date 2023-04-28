import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;


const URL = 'http://localhost:3001/'

export const publicRequest = axios.create({
    baseURL: URL,
    credentials: 'include'
}.credentials.includes);

export const userRequest = axios.create({
    baseURL: URL,
    credentials: 'include'
}.credentials.includes)  
