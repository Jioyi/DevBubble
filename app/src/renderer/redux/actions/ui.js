import * as API from '../API';
import {
  CHANGE_MIC_STATE,
  CHANGE_VOLUME_STATE,
  SET_OPEN_ADD_GROUP,
  SET_USER_STATE,
  SET_USER_TARGET_INFO,
  SET_OPEN_ALERT,
  SET_MESSAGE_ALERT,
} from '../constants';
const isElectron = require('is-electron');
const electron = isElectron();
const WIN = electron ? require('electron').remote.getCurrentWindow() : null;

export const close = () => {
  // eslint-disable-next-line no-unused-vars
  return (dispatch) => {
    try {
      WIN.minimizeApp();
    } catch (error) {
      console.log(error);
    }
  };
};

export const minimize = () => {
  // eslint-disable-next-line no-unused-vars
  return (dispatch) => {
    try {
      WIN.minimize();
    } catch (error) {
      console.log(error);
    }
  };
};

export const maximize = () => {
  // eslint-disable-next-line no-unused-vars
  return (dispatch) => {
    try {
      if (WIN.isMaximized()) {
        WIN.unmaximize();
      } else {
        WIN.maximize();
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const changeVolumeState = () => {
  return {
    type: CHANGE_VOLUME_STATE,
    payload: null,
  };
};

export const changeMicState = () => {
  return {
    type: CHANGE_MIC_STATE,
    payload: null,
  };
};

export const setOpenAddGroup = (payload) => {
  return {
    type: SET_OPEN_ADD_GROUP,
    payload: payload,
  };
};

export const ChangeUserState = (state) => {
  return async (dispatch) => {
    try {
      const response = await API.ChangeUserState(state);
      if (response.data?.message === 'successful') {
        dispatch(setUserState(state));
      }
    } catch (error) {
      console.log('ChangeUserState', error);
    }
  };
};

export const setUserState = (payload) => {
  return {
    type: SET_USER_STATE,
    payload: payload,
  };
};

export const getUserInfo = (userID) => {
  return async (dispatch) => {
    try {
      const response = await API.getUserInfo(userID);
      if (response.data?.message === 'successful') {
        dispatch(setUserTargetInfo(response.data.user));
      }
    } catch (error) {
      console.log('error getUserInfo', error);
    }
  };
};

export const setUserTargetInfo = (user) => {
  return {
    type: SET_USER_TARGET_INFO,
    payload: user,
  };
};

export const setOpenAlert = (boolean) => {
  return {
    type: SET_OPEN_ALERT,
    payload: boolean,
  };
};

export const setMessageAlert = (message) => {
  return {
    type: SET_MESSAGE_ALERT,
    payload: message,
  };
};

