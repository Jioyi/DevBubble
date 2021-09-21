import * as API from '../API';
import {
  SET_DIRECT_MESSAGES,
  SET_MESSAGES,
  ADD_MESSAGE,
  UPDATE_DIRECT_MESSAGE,
  SET_INPUT_SEARCH_MESSAGE,
  UPDATE_MESSAGE,
} from '../constants';
import store from '../store';
import { addHiddenItem } from './auth';

export const setHiddenDirectMessage = (DirectMessageID) => {
  return async (dispatch) => {
    try {
      const response = await API.setHiddenDirectMessage(DirectMessageID);
      if (response.data?.message === 'successful') {
        dispatch(addHiddenItem(DirectMessageID));
      }
    } catch (error) {
      console.log('error setHiddenDirectMessage', error);
    }
  };
};

export const sendMessageToUser = (data) => {
  // eslint-disable-next-line no-unused-vars
  return async (dispatch) => {
    try {
      const response = await API.sendMessageToUser(data);
      if (response.data?.message === 'successful') {
        //dispatch(addMessage(response.data.data));
      }
    } catch (error) {
      console.log('error sendMessageToUser', error);
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
  // eslint-disable-next-line no-unused-vars
  return async (dispatch) => {
    try {
      const response = await API.sendMessage(data);
      // eslint-disable-next-line no-empty
      if (response.data?.message === 'successful') {
      }
    } catch (error) {
      console.log('error sendMessage', error);
    }
  };
};

export const updateMessage = (data) => {
  // eslint-disable-next-line no-unused-vars
  return async (dispatch) => {
    try {
      await API.updateMessage(data);
    } catch (error) {
      console.log('error updateMessage', error);
    }
  };
};

export const clearMessages = (payload) => {
  return {
    type: SET_MESSAGES,
    payload: payload,
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

export const updateDirectMessage = (directMessage) => {
  const { directMessages } = store.getState().message;
  let index = directMessages.findIndex((DM) => DM.ID === directMessage.ID);
  let newDirectMessages = [...directMessages];
  if (index !== -1) {
    newDirectMessages[index] = { ...directMessage };
  } else {
    newDirectMessages.push(directMessage);
  }
  return {
    type: UPDATE_DIRECT_MESSAGE,
    payload: newDirectMessages,
  };
};

export const updateMessageInStore = (message) => {
  message
  const { messages } = store.getState().message;
  let index = messages.findIndex(
    (messageInStore) => messageInStore.ID === message.ID
  );
  let newMessages = [...messages];
  if (index !== -1) {
    newMessages[index] = { ...message };
  }
  return {
    type: UPDATE_MESSAGE,
    payload: newMessages,
  };
};

export const setInputSearchMessage = (string) => {
  return {
    type: SET_INPUT_SEARCH_MESSAGE,
    payload: string,
  };
};
