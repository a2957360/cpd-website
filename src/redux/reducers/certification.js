import {
  CREATE_USER_SUCCESS
} from '../constants/ActionTypes';
  
const INIT_STATE = {
  loginMessage: null,
  registerMessage: null,
  userID: '',
  sessionToken: '',
};
  
const Certification = (state = INIT_STATE, action) => {
  switch (action.type) {
  case CREATE_USER_SUCCESS: {
    return {
      ...state
    };
  }
  
  default:
    return state;
  }
};
  
export default Certification
  