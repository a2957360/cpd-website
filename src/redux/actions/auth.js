import { LOGIN_SUCCESS,
  GET_USER_SETTINGS_SUCCESS,
  UPDATE_USER_DETAIL_SUCCESS,
  RESET_PASSWORD_SUCCESS
 } from "../constants/ActionTypes";
import axios from "./axios";
import { baseURL, secondBaseURL } from "../../configs/AppConfig";

export const resetPassword = (data) => {
  return (dispatch) => {
    axios 
      .post(baseURL + `ResetPassword`,data)
      .then((res) => {
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};
export const updateUserDetail = (userid,data) => {
  return (dispatch) => {
    axios
      .post(baseURL + `UpdateUserDetails/${userid}`,data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization':"Bearer " + localStorage.getItem("token")
        },
      })
      .then((res) => {
        dispatch({ type: UPDATE_USER_DETAIL_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};
export const saveUserInfo = (userInfo) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_SUCCESS, payload: userInfo });
  };
};
export const getUserSettings = () => {
  return (dispatch) => {
    axios
      .get(baseURL + `GetUserSettings`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization':"Bearer " + localStorage.getItem("token")
        },
      })
      .then((res) => {
        dispatch({ type: GET_USER_SETTINGS_SUCCESS, payload: res.data });
        localStorage.setItem('userSettings',JSON.stringify(res.data))
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};