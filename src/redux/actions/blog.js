import { GET_BLOGS_SUCCESS, GET_BLOG_SUCCESS } from "../constants/ActionTypes";
import axios from "axios";
import { baseURL, secondBaseURL } from "../../configs/AppConfig";

//get all blogs
//已通过验证
export const getAllBlogs = () => {
  return (dispatch) => {
    axios
      .get(baseURL + "GetBlogs", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: GET_BLOGS_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

//get blog by id
//未通过验证。原因：数据返回错误
export const getBlogById = (data) => {
  return (dispatch) => {
    axios
      .get(secondBaseURL + `GetBlogDetails?BlogId=${data}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: GET_BLOG_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};
