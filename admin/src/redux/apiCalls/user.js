import { userAction } from "../slice/user";
import { publicRequest } from "../../requestMethods";

export const getUsers = async (dispatch) => {
  dispatch(userAction.getUsersStart());
  try {
    const response = await publicRequest.get("/users");
    dispatch(userAction.getUsersSuccess(response.data.users));
  } catch (error) {
    dispatch(userAction.getUsersFailure());
  }
};

export const getOneUder = async (dispatch, id) => {
  dispatch(userAction.getUsersStart());
  try {
    const response = await publicRequest.get(`/users/${id}`);
    dispatch(userAction.getUserSuccess(response.data.user));
  } catch (error) {
    dispatch(userAction.getUserFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(userAction.deleteUserStart());
  try {
    const response = await publicRequest.delete(`/users/${id}`);
    dispatch(userAction.deleteUserSuccess(response.data.user));
  } catch (error) {
    dispatch(userAction.deleteUserFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(userAction.addUserStart());
  try {
    const response = await publicRequest.patch(`/users/${id}`, user);
    dispatch(userAction.updateUserSuccess(response.data.user));
  } catch (error) {
    dispatch(userAction.updateUserFailure());
  }
};

export const addUser = async (user, dispatch) => {
  dispatch(userAction.addUserStart());
  try {
    const response = await publicRequest.post("/users/createUser", user);
    dispatch(userAction.addUserSuccess(response.data.user));
  } catch (error) {
    dispatch(userAction.addUsersFailure());
  }
};

export const getUserLastRents = async (id, dispatch) => {
  dispatch(userAction.lastRentsStart());
  try {
    const response = await publicRequest.get(`/users/lastRents/${id}`);
    dispatch(userAction.lastRentsSuccess(response.data.lastRents));
  } catch (error) {
    dispatch(userAction.lastRentsFailure());
  }
};
