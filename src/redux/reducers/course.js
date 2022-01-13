import {
  GET_COURSES_AND_PACKAGES_SUCCESS,
  GET_COURSE_SUCCESS,
  GET_PACKAGE_SUCCESS,
  GET_COURSES_BY_INSTRUCTOR_SUCCESS,
  GET_CUSTOM_PACKAGE_SUCCESS,
  GET_RELATED_COURSES_SUCCESS,
  GET_RELATED_PACKAGES_SUCCESS,
  GET_COURSE_NO_USER_SUCCESS,
  GET_ALL_CAT_SUBCAT_SUCCESS,
  CHECKOUT_SUCCESS,
  CHECKOUT_CREDIT_SUCCESS,
  CLEAR_CHECKOUT_SUCCESS,
  GET_MY_COURSES_SUCCESS,
  GET_MY_PACKAGES_SUCCESS,
  GET_MY_CERTIFICATES_SUCCESS,
  GET_MY_BOOKMARKS_SUCCESS,
  GET_MY_CUSTOMERORDERS_SUCCESS,
  GET_MY_DASH_BOARD_SUCCESS,
  REMOVE_BOOKMARK_SUCCESS,
  ADD_BOOKMARK_SUCCESS,
  GET_COURSES_AND_PACKAGES_BY_CATEGORY_SUCCESS,
  SUBMIT_ASSESS_SUCCESS,
  UPDATE_CHECKCOUT_SUCCESS,
  CLEAR_ASSESSMENT_SUCCESS,
  COURSE_RECEVIEW_SUCCESS,
  GET_COURSE_PACKAGE_SUCCESS,
  GET_MY_TRANSACTIONS_SUCCESS
} from "../constants/ActionTypes";

const INIT_STATE = {
  loginMessage: null,
  registerMessage: null,
  userID: "",
  sessionToken: "",
  categoryList: null,
  checkoutSuccess:'',
  mycourses:[],
  mypackages:[],
  mycertificates:[],
  mybookmarks:[],
  myCustomerOrders:[]
};

const Course = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_MY_CUSTOMERORDERS_SUCCESS: {
      return {
        ...state,
        myCustomerOrders: action.payload,
        updateCheckoutSuccess: false
      };
    }
    case GET_MY_BOOKMARKS_SUCCESS: {
      return {
        ...state,
        mybookmarks: action.payload,
      };
    }
    case GET_MY_CERTIFICATES_SUCCESS: {
      return {
        ...state,
        mycertificates: action.payload,
      };
    }
    case GET_MY_PACKAGES_SUCCESS: {
      return {
        ...state,
        mypackages: action.payload,
      };
    }
    case GET_MY_COURSES_SUCCESS: {
      return {
        ...state,
        mycourses: action.payload,
      };
    }
    case CHECKOUT_SUCCESS: {
      return {
        ...state,
        checkoutSuccess: action.payload,
      };
    }
    case CHECKOUT_CREDIT_SUCCESS: {
      return {
        ...state,
        checkoutCreditSuccess: action.payload,
      };
    }
    case CLEAR_CHECKOUT_SUCCESS: {
      return {
        ...state,
        checkoutSuccess: null,
        checkoutCreditSuccess: null,
      };
    }
    case GET_COURSES_AND_PACKAGES_SUCCESS: {
      return {
        ...state,
        courseList: action.payload,
      };
    }

    case GET_COURSE_SUCCESS: {
      return {
        ...state,
        courseDetail: action.payload,
      };
    }

    case GET_COURSE_NO_USER_SUCCESS: {
      return {
        ...state,
        courseDetailNoUser: action.payload,
      };
    }

    case GET_PACKAGE_SUCCESS: {
      return {
        ...state,
        packageDetail: action.payload,
      };
    }
    case GET_COURSE_PACKAGE_SUCCESS: {
      return {
        ...state,
        CoursePackage: action.payload,
      };
    }

    case GET_COURSES_BY_INSTRUCTOR_SUCCESS: {
      return {
        ...state,
      };
    }

    case GET_CUSTOM_PACKAGE_SUCCESS: {
      return {
        ...state,
        customePackage: action.payload,
      };
    }

    case GET_RELATED_COURSES_SUCCESS: {
      return {
        ...state,
        relatedCourse: action.payload,
      };
    }

    case GET_RELATED_PACKAGES_SUCCESS: {
      return {
        ...state,
        relatedPackage: action.payload
      };
    }

    case GET_ALL_CAT_SUBCAT_SUCCESS: {
      return {
        ...state,
        categoryList: action.payload,
      };
    }

    case GET_MY_DASH_BOARD_SUCCESS: {
      return {
        ...state,
        myDashBoard: action.payload,
      };
    }

    case REMOVE_BOOKMARK_SUCCESS: {
      return {
        ...state,
        removeBookMark: action.payload,
      };
    }

    case ADD_BOOKMARK_SUCCESS: {
      return {
        ...state,
        addBookMark: action.payload,
      };
    }

    case GET_COURSES_AND_PACKAGES_BY_CATEGORY_SUCCESS: {
      return {
        ...state,
        courseListByID: action.payload
      }
    }

    case SUBMIT_ASSESS_SUCCESS: {
      return {
        ...state,
        submitAssess: action.payload
      }
    }

    case UPDATE_CHECKCOUT_SUCCESS: {
      return {
        ...state,
        updateCheckoutSuccess: true
      }
    }
    
    case CLEAR_ASSESSMENT_SUCCESS: {
      return {
        ...state,
        submitAssess: null,
      };
    }
    case COURSE_RECEVIEW_SUCCESS: {
      return {
        ...state,
        courseReceview: action.payload
      }
    }

    case GET_MY_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        myTransactions: action.payload
      }
    }
    default:
      return state;
  }
};

export default Course;
