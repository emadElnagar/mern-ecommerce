import Axios from "axios";
import { 
  USER_SIGNOUT,
  USER_SIGN_IN_FAIL, 
  USER_SIGN_IN_REQUEST, 
  USER_SIGN_IN_SUCCESS ,
  USER_SIGN_UP_REQUEST,
  USER_SIGN_UP_SUCCESS,
  USER_SIGN_UP_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL
} from "../constants/UserConstants"

export const signup = (firstName, lastName, email, password) => async(dispatch) => {
  dispatch({type: USER_SIGN_UP_REQUEST, payload: { email, password } });
  try {
    const {data} = await Axios.post('/api/users/signup', {firstName, lastName, email, password});
    dispatch({
      type: USER_SIGN_UP_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_SIGN_IN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch(error) {
    dispatch({
      type: USER_SIGN_UP_FAIL,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}

export const signin = (email, password) => async(dispatch) => {
  dispatch({type: USER_SIGN_IN_REQUEST, payload: { email, password } });
  try {
    const {data} = await Axios.post('/api/users/signin', {email, password});
    dispatch({
      type: USER_SIGN_IN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch(error) {
    dispatch({
      type: USER_SIGN_IN_FAIL,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}

export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({type: USER_SIGNOUT});
}

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};