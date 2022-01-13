import { GET_CART_DATA, GET_CART_DATA_START, GET_COUPON_SUCCESS, GET_GENERATE_COUPON_SUCCESS,CLEAR_COUPON } from "../constants/ActionTypes";

const INIT_STATE = {
  cartList: localStorage.getItem("cartData")
    ? JSON.parse(localStorage.getItem("cartData"))
    : [],
};

const Cart = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CART_DATA: {
      return {
        ...state,
        cartList: action.payload,
      };
    }
    case GET_CART_DATA_START: {
      return {
        ...state,
        cartList: null,
      };
    }
    case GET_COUPON_SUCCESS: {
      return {
        ...state,
        validateCoupon: action.payload,
      };
    }
    case GET_GENERATE_COUPON_SUCCESS: {
      return {
        ...state,
        generateCoupon: action.payload,
      };
    }

    case CLEAR_COUPON: {
      return {
        ...state,
        validateCoupon: null,
      };
    }

    default:
      return state;
  }
};

export default Cart;
