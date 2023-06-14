import { homeStateAction } from "../slice/home";
import { publicRequest } from "../../requestMethods";

export const getTotalUsers = async (dispatch) => {
  dispatch(homeStateAction.getTotalUsersStart());
  try {
    const response = await publicRequest.get("/home/getUserLength");
    dispatch(homeStateAction.getTotalUsersSuccess(response.data.users));
  } catch (error) {
    dispatch(homeStateAction.getTotalUsersFailure());
  }
};

export const getTotalProducts = async (dispatch) => {
  dispatch(homeStateAction.getTotalProductsStart());
  try {
    const response = await publicRequest.get("/home/getProductLength");
    dispatch(homeStateAction.getTotalProductsSuccess(response.data.products));
  } catch (error) {
    dispatch(homeStateAction.getTotalProductsFailure());
  }
};

export const getTodayRentStats = async (dispatch) => {
  dispatch(homeStateAction.getTodayRentStatsStart());
  try {
    const response = await publicRequest.get("/home");
    dispatch(homeStateAction.getTodayRentStatsSuccess(response.data.data));
  } catch (error) {
    dispatch(homeStateAction.getTodayRentStatsFailure());
  }
};

export const getLastProducts = async (dispatch) => {
  dispatch(homeStateAction.getLastProductsStart());
  try {
    const response = await publicRequest.get("/home/getLastProducts");
    dispatch(
      homeStateAction.getLastProductsSuccess(response.data.lastProducts)
    );
  } catch (error) {
    dispatch(homeStateAction.getLastProductsFailure());
  }
};
