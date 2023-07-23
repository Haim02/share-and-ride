import { homeStateAction } from "../slice/home";
import axios  from 'axios';
const URL = "http://localhost:3000/api/admin/home";

export const publicRequest = axios.create({
  baseURL: URL,
});

export const getTotalUsers = async (dispatch) => {
  dispatch(homeStateAction.getTotalUsersStart());
  try {
    const response = await publicRequest.get("/getUserLength");
    dispatch(homeStateAction.getTotalUsersSuccess(response.data.users));
  } catch (error) {
    dispatch(homeStateAction.getTotalUsersFailure());
  }
};

export const getTotalProducts = async (dispatch) => {
  dispatch(homeStateAction.getTotalProductsStart());
  try {
    const response = await publicRequest.get("/getProductLength");
    dispatch(homeStateAction.getTotalProductsSuccess(response.data.products));
  } catch (error) {
    dispatch(homeStateAction.getTotalProductsFailure());
  }
};

export const getTodayRentStats = async (dispatch) => {
  dispatch(homeStateAction.getTodayRentStatsStart());
  try {
    const response = await publicRequest.get("/");
    dispatch(homeStateAction.getTodayRentStatsSuccess(response.data.data));
  } catch (error) {
    dispatch(homeStateAction.getTodayRentStatsFailure());
  }
};

export const getLastProducts = async (dispatch) => {
  dispatch(homeStateAction.getLastProductsStart());
  try {
    const response = await publicRequest.get("/getLastProducts");
    dispatch(
      homeStateAction.getLastProductsSuccess(response.data.lastProducts)
    );
  } catch (error) {
    dispatch(homeStateAction.getLastProductsFailure());
  }
};
