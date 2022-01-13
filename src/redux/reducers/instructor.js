import {
  GET_INSTRUCTOR_INFO_SUCCESS,
  GET_INSTRUCTOR_WORK_DETIAL_SUCCESS,
  GET_INSTRUCTOR_EDUCATION_DETIAL_SUCCESS,
  GET_INSTRUCTOR_CERTIFICATE_DETIAL_SUCCESS,
} from '../constants/ActionTypes';
  
const INIT_STATE = {

};
  
const Instructor = (state = INIT_STATE, action) => {
  switch (action.type) {
  case GET_INSTRUCTOR_INFO_SUCCESS: {
    return {
      ...state
    };
  }

  case GET_INSTRUCTOR_WORK_DETIAL_SUCCESS: {
    return {
      ...state
    };
  }

  case GET_INSTRUCTOR_EDUCATION_DETIAL_SUCCESS: {
    return {
      ...state
    };
  }

  case GET_INSTRUCTOR_CERTIFICATE_DETIAL_SUCCESS: {
    return {
      ...state
    };
  }
  
  default:
    return state;
  }
};
  
export default Instructor
  