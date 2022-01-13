import {
  GET_BLOGS_SUCCESS,
  GET_BLOG_SUCCESS
} from "../constants/ActionTypes";

const INIT_STATE = {
  loginMessage: null,
  registerMessage: null,
  userID: "",
  sessionToken: "",
};

const Blog = (state = INIT_STATE, action) => {
  switch (action.type) {
  case GET_BLOGS_SUCCESS: {
    return {
      ...state,
      blogListData: action.payload.Blogs
    };
  }

  case GET_BLOG_SUCCESS: {
    return {
      ...state,
      blogDetailData: action.payload
    };
  }

  default:
    return state;
  }
};

export default Blog
