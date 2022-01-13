import {
  GET_EVENTS_SUCCESS,
  GET_EVENT_SUCCESS,
  GET_PAST_EVENTS_SUCCESS,
  GET_PAST_EVENT_SUCCESS,
  REGISTER_EVENT_SUCCESS,
} from "../constants/ActionTypes";
import axios from "axios";
import { baseURL, secondBaseURL } from "../../configs/AppConfig";

//get all events
//已通过验证
export const getAllEvents = () => {
  return (dispatch) => {
    axios
      .get(secondBaseURL + "getevents", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: GET_EVENTS_SUCCESS, payload: res.data.AllEvents });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

//get event by name
//未通过验证。原因：无数据
export const getEventByName = (data) => {
  return (dispatch) => {
    axios
      .get(secondBaseURL + `getevent?eventname=${data}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: GET_EVENT_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

//get past events
//已通过验证
export const getPastEvents = () => {
  return (dispatch) => {
    axios
      .get(baseURL + "GetPastEvents", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: GET_PAST_EVENTS_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

//get past event by name
//已通过验证
//query: ?eventname={EventShortName}
//传EventShortName字段
export const getPastEventByName = (data) => {
  return (dispatch) => {
    axios
      .get(baseURL + `GetPastEvent?eventname=${data}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: GET_PAST_EVENT_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

//register for event
//已通过验证
//

export const registerEvent = (data) => {
  return (dispatch) => {
    axios
      .post(baseURL + "RegisterForEvent", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: REGISTER_EVENT_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};
