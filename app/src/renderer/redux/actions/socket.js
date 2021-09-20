import ClientSocketIO from 'socket.io-client';
import { SET_MAIN_SOCKET } from '../constants';
import { setLoading } from './auth';
import {
  addMessage,
  updateDirectMessage,
  updateMessageInStore,
} from './message';

const { SERVER_API_URL } = process.env;

export const ConnectServerIO = (token) => {
  return async (dispatch) => {
    try {
      const socket = ClientSocketIO(SERVER_API_URL, {
        query: { token: token },
        secure: true,
        reconnection: true,
        rejectUnauthorized: false,
        reconnectionAttempts: 10,
      });
      socket.on('connect', async () => {
        dispatch(setLoading(false));
      });
      socket.on('disconnect', async () => {
        dispatch(setLoading(true));
      });
      socket.on('ALERT_NEW_MESSAGE', async (data) => {
        const location = window.location.href;
        if (location.includes(`direct_message/${data.directMessageInfo.ID}`)) {
          dispatch(addMessage(data.messageInfo));
        }
        dispatch(updateDirectMessage(data.directMessageInfo));
      });
      socket.on('ALERT_EDITED_MESSAGE', async (data) => {
        const location = window.location.href;
        if (location.includes(`direct_message/${data.directMessageInfo.ID}`)) {
          dispatch(updateMessageInStore(data.messageInfo));
        }
        dispatch(updateDirectMessage(data.directMessageInfo));
      });
      dispatch(setMainSocket(socket));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setMainSocket = (socket) => {
  return {
    type: SET_MAIN_SOCKET,
    payload: socket,
  };
};
