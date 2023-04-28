import axios from "axios";
import { publicRequest, userRequest } from "../../requestMethods";
import { authAction } from "../slice/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import persistStore from "redux-persist/es/persistStore";

export const registerUser = async (dispatch, user) => {
  dispatch(authAction.registerStart());
  try {
    const response = await publicRequest.post("api/auth/auth/signup", user);
    dispatch(authAction.registerSuccess(response.data.user));
  } catch (error) {
    alert(error.response.data.message);
    dispatch(authAction.registerFailure(error.response.data.message));
  }
};

export const userLogin = async (dispatch, user) => {
  dispatch(authAction.loginStart());
  try {
    const response = await publicRequest.post("api/auth/auth/login", user);
    dispatch(authAction.loginSuccess(response.data.user));
  } catch (error) {
    dispatch(authAction.loginFailure());
    // dispatch(authAction.loginFailure(error.response.data.message))
  }
};

export const userLogout = async (dispatch) => {
  dispatch(authAction.logoutStart());
  try {
    const response = await publicRequest.get("/api/auth/auth/logout");
    dispatch(authAction.logoutSuccess());
  } catch (error) {
    dispatch(authAction.logoutFailure(error.response.data.message));
  }
};

export const isLoggedIn = async (dispatch) => {
  // dispatch(authAction.loginStart())
  try {
    const response = await publicRequest.get("api/auth/auth/isLoggedIn");
    return response.data.user;
    // console.log( 'user',response.data.user)
    // dispatch(authAction.loginSuccess(response.data.user))
  } catch (error) {
    return error.response.data.message;
    // dispatch(authAction.loginFailure(error.response.data.message))
  }
};

export const getUsertProduct = async (dispatch) => {
  dispatch(authAction.getUsertProductStart());
  try {
    const response = await publicRequest.get("/api/profile/userProduct");
    dispatch(authAction.getUsertProductSeccess(response.data.product[0]));
  } catch (error) {
    dispatch(authAction.getUsertProductFailure(error.response.data.message));
  }
};

export const uploadProduct = async (dispatch, product) => {
  dispatch(authAction.uploadProductStart());
  try {
    const response = await publicRequest.post(
      "/api/products/createProduct",
      product
    );
    dispatch(authAction.uploadProductSucess(response.data.product));
    alert("המוצר פורסם בהצלחה");
  } catch (error) {
    dispatch(authAction.uploadProductFailure(error.response.data.message));
    console.log(error.response);
  }
};

export const updateUser = async (dispatch, id, user) => {
  dispatch(authAction.updateUserStart());
  try {
    const response = await publicRequest.patch(`/api/profile/user/${id}`, user);
    console.log(response.data.user);
    dispatch(authAction.updateUserSucess(response.data.user));
  } catch (error) {
    dispatch(authAction.updateUserFailure(error.response.data.message));
  }
};

export const updateUserProduct = async (dispatch, id, product) => {
  dispatch(authAction.updateUserProductStart());
  try {
    const response = await publicRequest.patch(
      `/api/profile/userProduct/${id}`,
      product
    );
    dispatch(authAction.updateUserProductSuccess(response.data.product));
    console.log(response.data.product);
  } catch (error) {
    console.log(error);
    dispatch(authAction.updateUserProductFailure(error.response.data.message));
  }
};

export const updateUserPassword = async (
  dispatch,
  id,
  newPassword,
  currentPassword,
  passwordConfirm
) => {
  dispatch(authAction.updateUserPasswordStart());
  try {
    const response = await publicRequest.patch(
      `/api/profile/updatePassword/${id}`,
      newPassword,
      currentPassword,
      passwordConfirm
    );
    console.log("response", response);
    dispatch(authAction.updateUserPasswordSuccess());
  } catch (error) {
    console.log(error);
    dispatch(authAction.updateUserPasswordFailure());
  }
};

export const deleteUserProducts = async (dispatch, id) => {
  dispatch(authAction.deleteUserProductsStart());
  try {
    const response = await publicRequest.delete(
      `api/profile/userProduct/${id}`
    );
    console.log("response", response);
    dispatch(authAction.deleteUserProductsSuccess());
    alert("מוצר נמחק בהצלחה");
  } catch (error) {
    dispatch(authAction.deleteUserProductsFailure(error.response.data.message));
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await publicRequest.post("api/auth/forgotPassword", email);
    alert("נשלח קישור לאיפוס הסיסמה לכתובת מייל שהוזנה");
    console.log(response.data);
  } catch (error) {
    alert("אימיל לא תקין");
    console.log(error);
  }
};

export const resetPassword = async (dispatch, token, password) => {
  dispatch(authAction.loginStart());
  try {
    const response = await publicRequest.patch(
      `/api/auth/resetPassword/${token}`,
      password
    );
    dispatch(authAction.loginSuccess(response.data.user));
    alert("איפוס סיסמה בוצעה בהצלחה");
  } catch (error) {
    alert("סיסמה לא תקינה");
    console.log(error);
    dispatch(authAction.loginFailure(error.response.data.message));
  }
};

export const googleSignin = async (dispatch) => {
  dispatch(authAction.registerStart());
  try {
    const response = await publicRequest.get("/auth/google");
    console.log(response);
    dispatch(authAction.registerSuccess(response.data.user));
  } catch (error) {
    dispatch(authAction.registerFailure(error.response.data.message));
  }
};

// export const logout = async (dispatch) => {
//     dispatch(authAction.logoutStart())
//     try {
//         const res = await publicRequest.post("/auth/logout");
//         console.log('logout',res)
//         localStorage.clear();
//         persistor.purge()
//         dispatch(authAction.logoutSuccess(res.data))
//     } catch (error) {
//         console.log(error.message)
//         dispatch(authAction.logoutFailure())
//     }
// }
// export const registerUser = createAsyncThunk('auth/signup', async (user, {rejectWithValue}) => {
//     try {
//         const response = await publicRequest.post('api/user/auth/signup', user);
//         console.log(response.data.user)
//         return response.data.user
//     } catch (error) {
//         console.log('err',error.response.data.message)
//         return rejectWithValue(error.response.data.message)
//     }
// });

// export const userLogin = createAsyncThunk('auth/login', async (user, { rejectWithValue }) => {
//     try {
//         const response = await publicRequest.post('api/user/auth/login', user);
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.response.data.message)
//     }
// });
// export const userLogout = createAsyncThunk('auth/logout', async ({rejectWithValue}) => {
//     try {
//         const response = await publicRequest.get('http://localhost:3001/api/user/auth/logout');
//         console.log('logout',response)
//         persistStore.purge()
//         return null
//     } catch (error) {
//         console.log(error)
//         return rejectWithValue(error.message)
//     }
// });

// export const updateUser = createAsyncThunk('auth/profile', async ( id, user, {rejectWithValue} ) => {
//     try {
//         const response = await publicRequest.patch(`http://localhost:3001/api/profile/user/${id}`, user);
//        return response.data.user
//     } catch (error) {
//         return rejectWithValue(error.message)
//     }
// });

// export const geUsertProduct = createAsyncThunk('auth/profile/userProduct', async ( id, {rejectWithValue} ) => {
//     try {
//         const response = await publicRequest.get(`api/profile/userProduct/${id}`);
//         return response.data.product
//     } catch (error) {
//         return rejectWithValue(error.message)
//     }
// });

// export const updateUserProduct = createAsyncThunk('auth/profile/userProduct', async ( id, product, {rejectWithValue} ) => {
//     try {
//         const response = await publicRequest.patch(`api/profile/userProduct/${id}`, product);
//         return response.data.product
//     } catch (error) {
//         return rejectWithValue(error.message)
//     }
// });

// export const deleteUserProducts = createAsyncThunk('auth/profile/userProduct', async ( id, {rejectWithValue} ) => {
//     try {
//         const response = await publicRequest.delete(`api/profile/userProduct/${id}`);
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error.message)
//     }
// });

// // export const logout = async (dispatch) => {
// //     dispatch(authAction.logoutStart())
// //     try {
// //         const res = await publicRequest.post("/auth/logout");
// //         console.log('logout',res)
// //         localStorage.clear();
// //         persistor.purge()
// //         dispatch(authAction.logoutSuccess(res.data))
// //     } catch (error) {
// //         console.log(error.message)
// //         dispatch(authAction.logoutFailure())
// //     }
// // }
