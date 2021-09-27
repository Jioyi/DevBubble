import store from '../store/myStore';
import * as API from '../API';
import {
  SET_TOKEN,
  SET_USER,
  SET_AUTHENTICATE,
  SET_LOADING,
  SET_IS_ERROR,
  SET_HIDDEN_LIST,
  ADD_HIDDEN_ITEM,
  SET_SOCKET_STATE,
} from '../constants';
import { setUserState } from './ui';
import { setGroups } from './group';

export const refreshToken = () => {
  return async (dispatch) => {
    try {
      const response = await API.refreshToken();
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      dispatch(setHiddenList(response.data.hidden_list));
      dispatch(setUserState(response.data.user.state));
      dispatch(setGroups(response.data.groups));
      dispatch(setLoading(false));
      dispatch(setSocketState('connecting'));
    } catch (err) {
      console.log('error refreshToken', err);
      dispatch(logOut());
      dispatch(setIsError(true))
      dispatch(setLoading(false));
    }
  };
};

export const signUp = (body) => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    dispatch(setIsError(false))
    try {
      const response = await API.signUp(body);
      const { user, token } = response.data;
      dispatch(setUser(user));
      dispatch(setToken(token));
      dispatch(setLoading(false));
      dispatch(setIsError(false));
      dispatch(setAuthenticate(true))
    } catch (err) {
      dispatch(setLoading(false))
      dispatch(setIsError(true))
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
      dispatch(setAuthenticate(true))
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
    dispatch(setSocketState('destroy'));
  };
};

export const setHiddenList = (list) => {
  return {
    type: SET_HIDDEN_LIST,
    payload: list,
  };
};

export const addHiddenItem = (DirectMessageID) => {
  return {
    type: ADD_HIDDEN_ITEM,
    payload: DirectMessageID,
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
}

export const setSocketState = (state) => {
  return {
    type: SET_SOCKET_STATE,
    payload: state,
  };
};
