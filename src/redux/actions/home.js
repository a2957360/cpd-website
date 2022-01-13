import {
  GET_HOME_LAYOUT_SUCCESS,
  SUBSCRIBE_NEWSLETTER_SUCCESS,
  UNSUBSCRIBE_NEWSLETTER_SUCCESS,
} from '../constants/ActionTypes';
import axios from 'axios';
import { baseURL } from '../../configs/AppConfig';

//get home content(old)
//请求成功
export const getHomeLayoutSuccess = () => {
  return (dispatch) => {
    axios
      .get(baseURL + 'GetHomeContent', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        dispatch({ type: GET_HOME_LAYOUT_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

//subscribe newsletter by email
//请求成功
export const subscribeNewsletter = (data) => {
  return (dispatch) => {
    axios
      .get(baseURL + `SubScribeToNewsLetter?email=${data}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        dispatch({ type: SUBSCRIBE_NEWSLETTER_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

//unsubscribe newsletter by email
//请求成功
export const unsubscribeNewsletter = (data) => {
  return (dispatch) => {
    axios
      .post(baseURL + `SubScribeToNewsLetter?email=${data}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        dispatch({ type: UNSUBSCRIBE_NEWSLETTER_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};
