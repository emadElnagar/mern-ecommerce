import { 
  USER_SIGNOUT, 
  USER_SIGN_IN_FAIL, 
  USER_SIGN_IN_REQUEST, 
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_UP_REQUEST,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL
} from "../constants/UserConstants";

export const userSignupReducer = (state = {}, action) => {
  switch(action.type) {
    case USER_SIGN_UP_REQUEST:
      return {loading: true};
    case USER_SIGN_UP_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGN_UP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const userSigninReducer = (state = {}, action) => {
  switch(action.type) {
    case USER_SIGN_IN_REQUEST:
      return {loading: true};
    case USER_SIGN_IN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGN_IN_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
}

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};