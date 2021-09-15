import * as API from '../API';
import {
  SET_DIRECT_MESSAGES,
  SET_MESSAGES,
  ADD_MESSAGE,
  UPDATE_DIRECT_MESSAGE,
} from '../constants';
import store from '../store';

export const getMessages = (ID) => {
  return async (dispatch) => {
    try {
      const response = await API.getMessages(ID);
      if (response.data?.message === 'successful') {
        dispatch(setMessages(response.data.messages));
      }
    } catch (error) {
      console.log('error getDirectMessages', error);
    }
  };
};

export const getDirectMessages = () => {
  return async (dispatch) => {
    try {
      const response = await API.getDirectMessages();
      if (response.data?.message === 'successful') {
        dispatch(setDirectMessages(response.data.direct_messages));
      }
    } catch (error) {
      console.log('error getDirectMessages', error);
    }
  };
};

export const sendMessage = (data) => {
  return async (dispatch) => {
    try {
      const response = await API.sendMessage(data);
      if (response.data?.message === 'successful') {
        dispatch(addMessage(response.data.data));
      }
    } catch (error) {
      console.log('error sendMessage', error);
    }
  };
};

export const clearMessages = () => {
  return {
    type: SET_MESSAGES,
    payload: [],
  };
};

export const setDirectMessages = (directMessages) => {
  return {
    type: SET_DIRECT_MESSAGES,
    payload: directMessages,
  };
};

export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    payload: messages,
  };
};

export const addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    payload: message,
  };
};

export const updateCurrentDirectMessage = (directMessage) => {
  const { directMessages } = store.getState().message;
  let index = directMessages.findIndex((DM) => DM.ID === directMessage.ID);
  let newDirectMessages = [...directMessages];
  newDirectMessages[index] = { ...directMessage };
  return {
    type: UPDATE_DIRECT_MESSAGE,
    payload: newDirectMessages,
  };
};

export const updateDirectMessage = (directMessage) => {
  const { directMessages } = store.getState().message;
  let index = directMessages.findIndex((DM) => DM.ID === directMessage.ID);
  let newDirectMessages = [...directMessages];
  newDirectMessages[index] = { ...directMessage, new: true };
  return {
    type: UPDATE_DIRECT_MESSAGE,
    payload: newDirectMessages,
  };
};
