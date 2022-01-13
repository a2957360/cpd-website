import {
  GET_INSTRUCTOR_INFO_SUCCESS,
  GET_INSTRUCTOR_WORK_DETIAL_SUCCESS,
  GET_INSTRUCTOR_EDUCATION_DETIAL_SUCCESS,
  GET_INSTRUCTOR_CERTIFICATE_DETIAL_SUCCESS,
} from '../constants/ActionTypes';
import axios from 'axios';
import { baseURL } from '../../configs/AppConfig';

//get instructor info by id
//未通过验证 id = 0
export const getInstructorInfo = (id) => {
  return dispatch => {
    axios
      .get(baseURL + `GetInstructorInfoById/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        dispatch({ type: GET_INSTRUCTOR_INFO_SUCCESS, payload: res.data });
      })
      .catch(error => {
        console.log(error.response)
      });
  };
};

//get instructor works detail
//已通过验证 无数据 id = 0
export const getInstructorWorkDetail = (id) => {
  return dispatch => {
    axios
      .get(baseURL + `GetInstructorWorksDetail/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        dispatch({ type: GET_INSTRUCTOR_WORK_DETIAL_SUCCESS, payload: res.data });
      })
      .catch(error => {
        console.log(error.response)
      });
  };
};

//get instructor education detail
//已通过验证 无数据 id = 0
export const getInstructorEducationDetail = (id) => {
  return dispatch => {
    axios
      .get(baseURL + `GetInstructorEducationDetail/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        dispatch({ type: GET_INSTRUCTOR_EDUCATION_DETIAL_SUCCESS, payload: res.data });
      })
      .catch(error => {
        console.log(error.response)
      });
  };
};

//GetInstructorCertificateDetail
//已通过验证 无数据 id = 0
export const getInstructorCertificateDetail = (id) => {
  return dispatch => {
    axios
      .get(baseURL + `GetInstructorCertificatesDetail/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        dispatch({ type: GET_INSTRUCTOR_CERTIFICATE_DETIAL_SUCCESS, payload: res.data });
      })
      .catch(error => {
        console.log(error.response)
      });
  };
};