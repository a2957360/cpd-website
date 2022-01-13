import {
  CREATE_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  RESET_MESSAGE_SUCCESS,
  GET_REVIEWS_SUCCESS
} from "../constants/ActionTypes";
import axios from "axios";
import { baseURL } from "../../configs/AppConfig";

export const createNewUser = (data) => {
  return (dispatch) => {
    axios
      .post(baseURL + "users", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // localStorage.setItem("token", "Bearer " + res.data.token);
        localStorage.setItem("token", res.data.token);
        dispatch({ type: CREATE_USER_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const loginUser = (data) => {
  return (dispatch) => {
    axios
      .post(baseURL + "users/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // localStorage.setItem("token", "Bearer " + res.data.token);
        localStorage.setItem("token", res.data.token);
        console.log("saved token",res.data.token);
        dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const resetMessage = () => {
  return (dispatch) => {
    dispatch({ type: RESET_MESSAGE_SUCCESS });
  };
};

export const getAllReviews = (data) => {
  return (dispatch) => {
    axios
      .post(baseURL + "Admin/GetAllReviews", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: GET_REVIEWS_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};
