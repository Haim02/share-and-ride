import { createSlice } from "@reduxjs/toolkit";

const initialHomeState = {
  totalUsers: "",
  totalProducts: "",
  todayRentStats: "",
  todayRejectRentStats: "",
  todayApproveRentStats: "",
  lastProducts: [],
  isFetching: false,
  error: false,
};

const homeStateSlice = createSlice({
  name: "homeState",
  initialState: initialHomeState,
  reducers: {
    //Get TotalUsers
    getTotalUsersStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getTotalUsersSuccess(state, action) {
      state.isFetching = false;
      state.totalUsers = action.payload;
    },
    getTotalUsersFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Get TotalProducts
    getTotalProductsStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getTotalProductsSuccess(state, action) {
      state.isFetching = false;
      state.totalProducts = action.payload;
    },
    getTotalProductsFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Get TodayRentStats
    getTodayRentStatsStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getTodayRentStatsSuccess(state, action) {
      state.isFetching = false;
      state.todayRentStats = action.payload;
    },
    getTodayRentStatsFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Get TodayRejectRentStats
    getTodayRejectRentStatsStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getTodayRejectRentStatsSuccess(state, action) {
      state.isFetching = false;
      state.todayRejectRentStats = action.payload;
    },
    getTodayRejectRentStatsFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Get TodayRejectRentStats
    getTodayApproveRentStatsStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getTodayApproveRentStatsSuccess(state, action) {
      state.isFetching = false;
      state.todayApproveRentStats = action.payload;
    },
    getTodayApproveRentStatsFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    //Get LastProducts
    getLastProductsStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    getLastProductsSuccess(state, action) {
      state.isFetching = false;
      state.lastProducts = action.payload;
    },
    getLastProductsFailure(state) {
      state.isFetching = false;
      state.error = true;
    },

    clearState (state) {
      state.totalUsers = null;
      state.totalProducts = null;
      state.todayRentStats = null;
      state.todayRejectRentStats = null;
      state.todayApproveRentStats = null;
      state.lastProducts = null;
    },
  },
});

export const homeStateAction = homeStateSlice.actions;
export default homeStateSlice;
