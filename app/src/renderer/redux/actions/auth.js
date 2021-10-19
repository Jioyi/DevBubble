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

export const callbackTest = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const setSocketState = (state) => {
  return {
    type: SET_SOCKET_STATE,
    payload: state,
  };
};
