import { GET_CART_DATA, GET_CART_DATA_START, GET_COUPON_SUCCESS, GET_GENERATE_COUPON_SUCCESS,CLEAR_COUPON } from "../constants/ActionTypes";
import axios from "axios";
import { baseURL, secondBaseURL } from "../../configs/AppConfig";
import { message } from "antd";

//get all blogs
//已通过验证
export const getCartList = () => {
  return (dispatch) => {
    dispatch({ type: GET_CART_DATA_START });
    const cart = JSON.parse(localStorage.getItem("cartData"));
    dispatch({ type: GET_CART_DATA, payload: cart });
  };
};
// ValidateCoupon
export const getValidateCoupon = (code) => {
  return (dispatch) => {
    dispatch({ type: CLEAR_COUPON});
    axios
      .get(secondBaseURL + "Admin/ValidateCoupon/?CouponCode=" + code, {
        headers: {
          "Content-Type": "application/json",
          'Authorization':"Bearer " + localStorage.getItem("token")
        },
      })
      .then((res) => {
        if (res.data === "Invalid Coupon") {
          message.error("Coupon is invalid");
        }
        dispatch({ type: GET_COUPON_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        if (error.response === "Invalid Coupon") {
          message.error("Coupon is invalid");
        }else if(error.response === "Token Expired") {
          message.error("Coupon is already expired");
        }else {
          message.error("Request Error");
        }
        console.log(error.response);
      });
  };
};

export const clearCoupon = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_COUPON});
  };
};

// GET /api/v1/Admin/GenerateCoupon
export const getGenerateCoupon = (discount, userId) => {
  return (dispatch) => {
    axios
      .get(secondBaseURL +  `Admin/GenerateCoupon/?Discount=${discount}&userid=${userId}`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization':"Bearer " + localStorage.getItem("token")
        },
      })
      .then((res) => {
        dispatch({ type: GET_GENERATE_COUPON_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        message.error(error.response)
        console.log(error.response);
      });
  };
};