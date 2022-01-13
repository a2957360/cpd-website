import {
  GET_COURSES_AND_PACKAGES_SUCCESS,
  GET_COURSE_SUCCESS,
  GET_PACKAGE_SUCCESS,
  GET_COURSE_PACKAGE_SUCCESS,
  GET_COURSES_BY_INSTRUCTOR_SUCCESS,
  GET_CUSTOM_PACKAGE_SUCCESS,
  GET_RELATED_COURSES_SUCCESS,
  GET_RELATED_PACKAGES_SUCCESS,
  GET_COURSE_NO_USER_SUCCESS,
  GET_ALL_CAT_SUBCAT_SUCCESS,
  CHECKOUT_SUCCESS,
  CLEAR_CHECKOUT_SUCCESS,
  CLEAR_ASSESSMENT_SUCCESS,
  GET_MY_COURSES_SUCCESS,
  GET_MY_PACKAGES_SUCCESS,
  GET_MY_CERTIFICATES_SUCCESS,
  GET_MY_BOOKMARKS_SUCCESS,
  GET_MY_CUSTOMERORDERS_SUCCESS,
  GET_MY_DASH_BOARD_SUCCESS,
  ADD_BOOKMARK_SUCCESS,
  REMOVE_BOOKMARK_SUCCESS,
  GET_COURSES_AND_PACKAGES_BY_CATEGORY_SUCCESS,
  CHECKOUT_CREDIT_SUCCESS,
  SUBMIT_ASSESS_SUCCESS,
  UPDATE_CHECKCOUT_SUCCESS,
  CLEAR_UPDATE_CHECKCOUT_SUCCESS,
  COURSE_RECEVIEW_SUCCESS,
  GET_MY_TRANSACTIONS_SUCCESS,
  LOGIN_SUCCESS
} from "../constants/ActionTypes";
import axios from "axios";
import { baseURL } from "../../configs/AppConfig";

const token = localStorage.getItem("token");
//get all course and packages
//已通过验证 Anonymous

export const getCustomerOrders = (userid) => {

  return (dispatch) => {
    axios
      .get(baseURL + `course/CustomerOrders/?userid=${userid}`, {
        headers: {
          "Content-Type": "application/json", 'Authorization': "Bearer " + token
        },
      })
      .then((res) => {
        dispatch({ type: GET_MY_CUSTOMERORDERS_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_SUCCESS, payload: null });
        localStorage.clear();
        window.location.href = "/";
      });
  };
};

export const getTransactions = (userid) => {
  return (dispatch) => {
    axios
      .get(baseURL + `Admin/InstructorTransactions/?userid=${userid}`, {
        headers: {
          "Content-Type": "application/json", 'Authorization': "Bearer " + token
        },
      })
      .then((res) => {
        dispatch({ type: GET_MY_TRANSACTIONS_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_SUCCESS, payload: null });
        localStorage.clear();
        window.location.href = "/";
      });
  };
};

export const getMyBookMarks = (userid) => {
  return (dispatch) => {
    axios
      .get(baseURL + `course/GetMyBookMarks/?userid=${userid}`, {
        headers: {
          "Content-Type": "application/json", 'Authorization': "Bearer " + token
        },
      })
      .then((res) => {
        dispatch({ type: GET_MY_BOOKMARKS_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        // dispatch({ type: LOGIN_SUCCESS, payload: null });
        // localStorage.clear();
        // window.location.href = "/";
        console.log("get my bookmark error!!!!!!",error);
      });
  };
};
export const getMyCertificates = (userid) => {
  return (dispatch) => {
    axios
      .get(baseURL + `course/GetMyCertificates/?userid=${userid}`, {
        headers: {
          "Content-Type": "application/json", 'Authorization': "Bearer " + token
        },
      })
      .then((res) => {
        dispatch({ type: GET_MY_CERTIFICATES_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_SUCCESS, payload: null });
        localStorage.clear();
        window.location.href = "/";
      });
  };
};
export const getMyPackages = (userid) => {

  return (dispatch) => {
    axios
      .get(baseURL + `course/GetMyPackages/?userid=${userid}`, {
        headers: {
          "Content-Type": "application/json", 'Authorization': "Bearer " + token
        },
      })
      .then((res) => {
        dispatch({ type: GET_MY_PACKAGES_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_SUCCESS, payload: null });
        localStorage.clear();
        window.location.href = "/";
      });
  };
};
export const getMyCourses = (userid) => {
  return (dispatch) => {
    axios
      .get(baseURL + `course/GetMyCourses/?userid=${userid}`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + token
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: GET_MY_COURSES_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error)
        dispatch({ type: LOGIN_SUCCESS, payload: null });
        localStorage.clear();
        window.location.href = "/";
      });
  };
};
export const getAllCoursesAndPackages = (id) => {
  return (dispatch) => {
    axios
      .get(baseURL + `GetAllCoursesAndPackages?categoryId=${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: GET_COURSES_AND_PACKAGES_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};
// GetCoursesAndPackagesByCategoryId
export const getCoursesAndPackagesByCategoryId = (id, userId) => {
  return (dispatch) => {
    axios
      .get(baseURL + `Course/GetCoursesAndPackagesByCategoryId?categoryId=${id}&userid=${userId}`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + token
        },
      })
      .then((res) => {
        dispatch({ type: GET_COURSES_AND_PACKAGES_BY_CATEGORY_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_SUCCESS, payload: null });
        localStorage.clear();
        window.location.href = "/";
      });
  };
};
// get Package by id
export const getPackageById = (courseId, userId) => {
  if (userId === null) {
    return (dispatch) => {
      console.log("get course detail with user input", courseId);
      axios
        .get(
          baseURL +
          `getpackagebyID?CourseId=${courseId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("get course detail with user result", res);
          dispatch({ type: GET_PACKAGE_SUCCESS, payload: res.data[0] });
        })
        .catch((error) => {
          console.log(error)
        });
    };
  }
  return (dispatch) => {
    console.log("get course detail with user input", courseId);
    axios
      .get(
        baseURL +
        `GetPackageById?CourseId=${courseId}&userid=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer " + token
          },
        }
      )
      .then((res) => {
        console.log("get course detail with user result", res);
        dispatch({ type: GET_PACKAGE_SUCCESS, payload: res.data[0] });
      })
      .catch((error) => {
        console.log(error)
        dispatch({ type: LOGIN_SUCCESS, payload: null });
        localStorage.clear();
        window.location.href = "/";
      });
  };
};
// GetCoursesMyFromPackage
export const GetCoursesMyFromPackage = (courseId, userId) => {
  return (dispatch) => {
    console.log("get course detail with user input", courseId, userId);
    axios
      .get(
        baseURL +
        `Course/GetCoursesMyFromPackage?CourseId=${courseId}&userid=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer " + token
          },
        }
      )
      .then((res) => {
        console.log("get course detail with user result", res);
        dispatch({ type: GET_COURSE_PACKAGE_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_SUCCESS, payload: null });
        localStorage.clear();
        window.location.href = "/";
      });
  };
};
//get course by id
export const getCourseById = (courseId, userId) => {
  return (dispatch) => {
    console.log("get course detail with user input", courseId, userId);
    axios
      .get(
        baseURL +
        `Course/GetMyCourseById/?CourseId=${courseId}&userid=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer " + token
          },
        }
      )
      .then((res) => {
        console.log("get course detail with user result", res);
        dispatch({ type: GET_COURSE_SUCCESS, payload: res.data[0] });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_SUCCESS, payload: null });
        localStorage.clear();
        window.location.href = "/";
      });
  };
};

//get course by id no userId
export const getCourseByIdNoUser = (courseId) => {
  return (dispatch) => {
    axios
      .get(baseURL + `GetCourseById?CourseId=${courseId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("get course detail no user", res.data);
        dispatch({ type: GET_COURSE_NO_USER_SUCCESS, payload: res.data[0] });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

//get package by id
//已通过验证 Anonymous
// export const getPackageById = (id) => {
//   return (dispatch) => {
//     axios
//       .get(baseURL + `GetPackagebyId?CourseId=${id}`, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((res) => {
//         console.log('detail package',res.data)
//         dispatch({ type: GET_PACKAGE_SUCCESS, payload: res.data[0] });
//       })
//       .catch((error) => {
//         console.log(error.response);
//       });
//   };
// };

//get course by instructor id
//已通过验证 Anonymous
export const getCourseByInstructorId = (id) => {
  return (dispatch) => {
    axios
      .get(baseURL + `GetCoursesByInstructor?instructorId=${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({
          type: GET_COURSES_BY_INSTRUCTOR_SUCCESS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

//get custom package
//请求成功 无返回数据 Anonymous
export const getCustomPackage = (data) => {
  return (dispatch) => {
    axios
      .get(
        baseURL +
        `GetCustomPackage?CourseId=223&userid=0`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        dispatch({ type: GET_CUSTOM_PACKAGE_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

//get related courses
//已通过验证 Anonymous
export const getRelatedCourses = (id) => {
  return (dispatch) => {
    axios
      .get(baseURL + `GetRelatedCourses?categoryId=${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log("get realted course result", res.data);
        dispatch({ type: GET_RELATED_COURSES_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

//get related packages
//已通过验证 Anonymous
export const getRelatedPackages = (id) => {
  return (dispatch) => {
    axios
      .get(baseURL + `GetRelatedPackages?categoryId=${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: GET_RELATED_PACKAGES_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

// course checkoutPOST /api/v1/Course/CheckoutCredit
export const checkout = (data) => {
  return (dispatch) => {
    axios
      .post(baseURL + "course/Checkout", data, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + token
        },
      })
      .then((res) => {
        dispatch({ type: CHECKOUT_SUCCESS, payload: res.data });
      })
      .catch((e) => console.log(e));
  };
};
export const CheckoutCredit = (data) => {
  return (dispatch) => {
    axios
      .post(baseURL + "course/CheckoutCredit", data, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + token
        },
      })
      .then((res) => {
        dispatch({ type: CHECKOUT_CREDIT_SUCCESS, payload: res.data });
      })
      .catch((e) => console.log(e));
  };
};
export const clearCheckout = () => {
  return dispatch => {
    dispatch({ type: CLEAR_CHECKOUT_SUCCESS });
  };
};
///api/v1/GetAllCatSubCategories
export const getAllCatSubCategories = () => {
  return (dispatch) => {
    axios
      .get(baseURL + `GetAllCatSubCategories`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: GET_ALL_CAT_SUBCAT_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

//get MyDashBoardContent
export const getMyDashBoardContent = (userid) => {
  return (dispatch) => {
    axios
      .get(baseURL + `course/GetMyDashBoardContent?userid=${userid}`, {
        headers: {
          "Content-Type": "application/json", 'Authorization': "Bearer " + token
        },
      })
      .then((res) => {
        dispatch({ type: GET_MY_DASH_BOARD_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_SUCCESS, payload: null });
        localStorage.clear();
        window.location.href = "/";
      });
  };
};

// course addBookMark POST /api/v1/Course/AddBookMark
export const addBookMark = (data) => {
  return (dispatch) => {
    axios
      .post(baseURL + "Course/AddBookMark", data, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + token
        },
      })
      .then((res) => {
        dispatch({ type: ADD_BOOKMARK_SUCCESS, payload: res.data });
      })
      .catch((e) => console.log(e));
  };
};
// POST /api/v1/Course/RemoveBookMark
export const removeBookMark = (data) => {
  return (dispatch) => {
    axios
      .post(baseURL + "Course/RemoveBookMark", data, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + token
        },
      })
      .then((res) => {
        dispatch({ type: REMOVE_BOOKMARK_SUCCESS, payload: res.data });
      })
      .catch((e) => console.log(e));
  };
};

// POST /api/v1/Course/RemoveBookMark
export const updateUserCourseProgress = (data) => {
  return (dispatch) => {
    axios
      .post(baseURL + "Course/UpdateUserCourseProgress", data, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + token
        },
      })
      .then((res) => {
        // dispatch({ type: Up_BOOKMARK_SUCCESS, payload: res.data });
      })
      .catch((e) => console.log(e));
  };
};
export const SubmitAssessmentAnswers = (data) => {
  return (dispatch) => {
    axios
      .post(baseURL + "course/SubmitAssessmentAnswers", data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': "Bearer " + token
        },
      })
      .then((res) => {
        dispatch({ type: SUBMIT_ASSESS_SUCCESS, payload: res.data });
      })
      .catch((e) => console.log(e));
  };
};

export const clearAssessment = () => {
  return dispatch => {
    dispatch({ type: CLEAR_ASSESSMENT_SUCCESS });
  };
};
export const AddCourseReview = (id, data) => {
  return (dispatch) => {
    axios
      .post(baseURL + "course/AddCourseReview/" + id, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + token
        },
      })
      .then((res) => {
        dispatch({ type: COURSE_RECEVIEW_SUCCESS, payload: res.data });
      })
      .catch((e) => console.log(e));
  };
};

//get package course by id
export const getPackageCourseById = (courseId, userId, parentId) => {
  return (dispatch) => {
    axios
      .get(
        baseURL +
        `Course/GetMyCourseFromPackage/?CourseId=${courseId}&userid=${userId}&parentId=${parentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            'Authorization': "Bearer " + token
          },
        }
      )
      .then((res) => {
        console.log("get course detail with user result", res);
        dispatch({ type: GET_COURSE_SUCCESS, payload: res.data[0] });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_SUCCESS, payload: null });
        localStorage.clear();
        window.location.href = "/";
      });
  };
};
//package 
export const updateUserPackageCourseProgress = (data) => {
  return (dispatch) => {
    axios
      .post(baseURL + "Course/UpdateUserPackageCourse", data, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + token
        },
      })
      .then((res) => {
        // dispatch({ type: Up_BOOKMARK_SUCCESS, payload: res.data });
      })
      .catch((e) => console.log(e));
  };
};

//update checkout result
export const updateCheckoutResult = (data) => {
  return (dispatch) => {
    axios
      .post(baseURL + "Course/UpdatePaymentTransactionStatus", data, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + token
        },
      })
      .then((res) => {
        dispatch({ type: UPDATE_CHECKCOUT_SUCCESS, payload: res.data });
      })
      .catch((e) => console.log(e));
  };
};
// get all categories and subcategories
// export const getAllCatSubCategories = () => {
//   return (dispatch) => {
//     axios
//       .get(baseURL + `GetAllCatSubCategories`, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((res) => {
//         dispatch({ type: GET_ALL_CAT_SUB_CATEGORIES, payload: res.data });
//       })
//       .catch((error) => {
//         console.log(error.response);
//       });
//   };
// };

// get categories
// export const getCategories = () => {
//   return (dispatch) => {
//     console.log("get categories input");
//     axios
//       .get(baseURL + `Course/GetCategories`, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((res) => {
//         console.log("get categories result", res);
//       })
//       .catch((error) => {
//         console.log(error.response);
//       });
//   };
