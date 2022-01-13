import { LOGIN_SUCCESS,GET_USER_SETTINGS_SUCCESS } from "../constants/ActionTypes";

const INIT_STATE = {
  userInfo: JSON.parse(localStorage.getItem('userinfo')),
  userSettings:JSON.parse(localStorage.getItem('userSettings'))||{}
};

const Auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_SETTINGS_SUCCESS: {
      return {
        ...state,
        userSettings: action.payload,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload,
      };
    }

    default:
      return state;
  }
};

export default Auth;
