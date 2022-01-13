import { combineReducers } from "redux";
import authReducer from "./auth";
import courseReducer from "./course";
import eventReducer from "./event";
import instructorReducer from "./instructor";
import blogReducer from "./blog";
import certificationReducer from "./certification";
import resourceReducer from "./resource";
import userReducer from "./user";
import homeReducer from "./home";
import cartReducer from "./cart";

export default combineReducers({
  authData: authReducer,
  courseData: courseReducer,
  eventData: eventReducer,
  instructorData: instructorReducer,
  blogData: blogReducer,
  certificationData: certificationReducer,
  resourceData: resourceReducer,
  userData: userReducer,
  homeData: homeReducer,
  cartData: cartReducer,
});
