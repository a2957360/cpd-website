import {
  SUBMIT_CONTACT_SUCCESS,
  RESET_RESOURSE_MESSAGE_SUCCESS
} from "../constants/ActionTypes";

const INIT_STATE = {
  sendContactMessage: null
};

const Resource = (state = INIT_STATE, action) => {
  switch (action.type) {
  case SUBMIT_CONTACT_SUCCESS: {
    return {
      ...state,
      sendContactMessage: "success"
    };
  }

  case RESET_RESOURSE_MESSAGE_SUCCESS: {
    return {
      ...state,
      sendContactMessage: null
    }
  }

  default:
    return state;
  }
};

export default Resource
