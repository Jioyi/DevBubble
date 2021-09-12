import * as API from '../API';
import { SET_DIRECT_MESSAGES, SET_MESSAGES } from '../constants';

export const getMessages = (ID) => {
	// eslint-disable-next-line no-unused-vars
	return async (dispatch) => {
		try {
			const response = await API.getMessages(ID);
			if (response.data?.message === 'successful') {
				console.log(response.data.messages)				
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
	// eslint-disable-next-line no-unused-vars
	return async (dispatch) => {
		try {
			const response = await API.sendMessage(data);
			if (response.data?.message === 'successful') {
				///
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
