import { authAction } from "../slice/auth";
import { publicRequest } from "../../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(authAction.loginStart());
  try {
    const response = await publicRequest.post("/login", user);
    dispatch(authAction.loginSuccess(response.data.user));
  } catch (error) {
    dispatch(authAction.loginFailure(error.response.data.message));
  }
};

export const logout = async (dispatch) => {
  dispatch(authAction.logoutStart());
  try {
    const response = await publicRequest.get("/logout");
    dispatch(authAction.logoutSuccess());
  } catch (error) {
    dispatch(authAction.logoutFailure(error.response.data.message));
  }
};
