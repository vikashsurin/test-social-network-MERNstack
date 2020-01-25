import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_PROFILE
} from './types';
import setAuthToken from '../../utils/setAuthToken';

//load user
export const loadUser = () => async dispatch => {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
    // console.log('loaded', res.data);
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//register a user
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;

    console.error(errors);
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//login a user
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: LOGIN_FAIL
    }); 
  }
};

//logout user
export const logout = history => async dispatch => {
  await window.history.go(2);

  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};
