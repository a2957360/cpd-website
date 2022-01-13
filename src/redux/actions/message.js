import {
  RESET_RESOURSE_MESSAGE_SUCCESS
} from "../constants/ActionTypes";

//reset all message
export const resetMessage = () => {
  return dispatch => {
    dispatch({ type: RESET_RESOURSE_MESSAGE_SUCCESS });
  };
}