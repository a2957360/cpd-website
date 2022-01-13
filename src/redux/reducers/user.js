import {
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  RESET_MESSAGE_SUCCESS,
  GET_REVIEWS_SUCCESS
} from '../constants/ActionTypes';

const INIT_STATE = {
  loginMessage: null,
  registerMessage: null,
  userID:'',
  sessionToken:'',
};

const User = (state = INIT_STATE, action) => {
  switch (action.type) {
  case CREATE_USER_SUCCESS: {
    return {
      ...state,
      registerMessage: 'success'
    };
  }

  case CREATE_USER_FAIL: {
    return {
      ...state,
      registerMessage: 'fail'
    };
  }

  case LOGIN_USER_SUCCESS: {
    return {
      ...state,
      loginMessage: 'success'
    };
  }

  case LOGIN_USER_FAIL: {
    return {
      ...state,
      loginMessage: 'fail'
    };
  }

  case RESET_MESSAGE_SUCCESS: {
    return {
      ...state,
      loginMessage: null,
      registerMessage: null
    };
  }

  case GET_REVIEWS_SUCCESS: {
    return {
      ...state,
      allReviews: action.payload
    }
  }

  default:
    return state;
  }
};

export default User
