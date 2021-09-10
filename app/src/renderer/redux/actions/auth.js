import store from '../store/myStore';
import * as API from '../API';
import {
  SET_TOKEN,
  SET_USER,
  SET_AUTHENTICATE,
  SET_LOADING,
} from '../constants';
import { ConnectServerIO } from './socket';
import { setUserState } from './ui';
import { setGroups } from './group';

export const checkToken = () => {
  return async (dispatch) => {
    try {
      const response = await API.checkToken();
      if (response.data?.message === 'successful') {
        console.log('check', response.data);
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

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await API.login({ email, password });
      if (response.data?.message === 'successful') {
        console.log('login', response.data);
        dispatch(setUser(response.data.user));
        dispatch(setToken(response.data.token));
        dispatch(setAuthenticate(true));
      } else {
        dispatch(logOut());
      }
    } catch (error) {
      console.log('error login', error);
      dispatch(logOut());
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

export const setLoading = (bolean) => {
  return {
    type: SET_LOADING,
    payload: bolean,
  };
};

export const callbackTest = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
