import {
  GET_HOME_LAYOUT_SUCCESS,
  SUBSCRIBE_NEWSLETTER_SUCCESS,
  UNSUBSCRIBE_NEWSLETTER_SUCCESS,
} from '../constants/ActionTypes';

const INIT_STATE = {
  homeContent: null,
};

const Home = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_HOME_LAYOUT_SUCCESS: {
      return {
        ...state,
        homeContent: action.payload,
      };
    }

    case SUBSCRIBE_NEWSLETTER_SUCCESS: {
      return {
        ...state,
      };
    }

    case UNSUBSCRIBE_NEWSLETTER_SUCCESS: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default Home;
