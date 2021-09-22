import store from '../store/myStore';
import * as API from '../API';
import {
  SET_TOKEN,
  SET_USER,
  SET_AUTHENTICATE,
  SET_LOADING,
  SET_IS_ERROR
} from '../constants';
import { ConnectServerIO } from './socket';
import { setUserState } from './ui';
import { setGroups } from './group';

export const checkToken = () => {
  return async (dispatch) => {
    try {
      const response = await API.checkToken();
      if (response.data?.message === 'successful') {
        dispatch(setUser(response.data.user)); 
        dispatch(setToken(response.data.token));
        dispatch(setUserState(response.data.user.state));
        dispatch(setGroups(response.data.groups));
        dispatch(ConnectServerIO(response.data.token));
      } else {
        dispatch(logOut());
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log('error checkToken', error);
      dispatch(setLoading(false));
    }
  };
};

export const signIn = (body) => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    dispatch(setIsError(false))
    try {
      const response = await API.signIn(body);
      const { user, token } = response.data;
      dispatch(setUser(user));
      dispatch(setToken(token));
      dispatch(setLoading(false));
      dispatch(setIsError(false));
    } catch (err) {
      dispatch(setLoading(false))
      dispatch(setIsError(true))
    }
  };
};

export const logOut = () => {
  return (dispatch) => {
    store.removeItem('user');
    store.removeItem('access_token');
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(setAuthenticate(false));
  };
};

export const setUser = (user) => {
  store.setItem('user', JSON.stringify(user));
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setToken = (token) => {
  store.setItem('access_token', token);
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

export const setAuthenticate = (bolean) => {
  return {
    type: SET_AUTHENTICATE,
    payload: bolean,
  };
};

export const setLoading = (boolean) => {
  return {
    type: SET_LOADING,
    payload: boolean,
  };
};

export const setIsError = (boolean) => {
  return {
    type: SET_IS_ERROR,
    payload: boolean
  }
};

export const callbackTest = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
