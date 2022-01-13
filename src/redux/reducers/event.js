import {
  GET_EVENTS_SUCCESS,
  GET_EVENT_SUCCESS,
  GET_PAST_EVENTS_SUCCESS,
  GET_PAST_EVENT_SUCCESS,
  REGISTER_EVENT_SUCCESS,
} from "../constants/ActionTypes";

const INIT_STATE = {};

const Event = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EVENTS_SUCCESS: {
      return {
        ...state,
        eventListData: action.payload,
      };
    }

    case GET_EVENT_SUCCESS: {
      return {
        ...state,
        eventDetail: action.payload,
      };
    }

    case GET_PAST_EVENTS_SUCCESS: {
      return {
        ...state,
      };
    }

    case GET_PAST_EVENT_SUCCESS: {
      return {
        ...state,
      };
    }

    case REGISTER_EVENT_SUCCESS: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default Event;
