import {
  SUBMIT_CONTACT_SUCCESS
} from "../constants/ActionTypes";
import axios from "axios";
import { baseURL } from "../../configs/AppConfig";

//send contact us form
export const submitContact = (data) => {
  return dispatch => {
    axios
      .post(baseURL + "SendQuery ", data, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        dispatch({ type: SUBMIT_CONTACT_SUCCESS, payload: res.data });
      })
      .catch(error => {
        console.log(error.response)
      });
  };
};