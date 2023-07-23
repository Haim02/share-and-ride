import { userAction } from "../slice/user";
import axios from "axios";
const URL = "http://localhost:3000/api/admin/users";

export const publicRequest = axios.create({
  baseURL: URL,
});

export const getUsers = async (dispatch) => {
  dispatch(userAction.getUsersStart());
  try {
    const response = await publicRequest.get("");
    dispatch(userAction.getUsersSuccess(response.data.users));
  } catch (error) {
    dispatch(userAction.getUsersFailure());
  }
};

export const getOneUser = async (dispatch, id) => {
  dispatch(userAction.getUserStart());
  try {
    const response = await publicRequest.get(`/${id}`);
    dispatch(userAction.getUserSuccess(response.data.user));
  } catch (error) {
    dispatch(userAction.getUserFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(userAction.deleteUserStart());
  try {
    const response = await publicRequest.delete(`/${id}`);
    dispatch(userAction.deleteUserSuccess(id));
  } catch (error) {
    dispatch(userAction.deleteUserFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(userAction.addUserStart());
  try {
    const response = await publicRequest.patch(`/${id}`, user);
    dispatch(userAction.updateUserSuccess(response.data.user));
  } catch (error) {
    dispatch(userAction.updateUserFailure());
  }
};

export const addUser = async (user, dispatch) => {
  dispatch(userAction.addUserStart());
  try {
    const response = await publicRequest.post("/createUser", user);
    dispatch(userAction.addUserSuccess(response.data.user));
  } catch (error) {
    dispatch(userAction.addUserFailure());
  }
};

export const getUserLastRents = async (id, dispatch) => {
  dispatch(userAction.lastRentsStart());
  try {
    const response = await publicRequest.get(`/lastRents/${id}`);
    dispatch(userAction.lastRentsSuccess(response.data.lastRents));
  } catch (error) {
    dispatch(userAction.lastRentsFailure());
  }
};
