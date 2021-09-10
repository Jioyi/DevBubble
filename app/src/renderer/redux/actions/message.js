import * as API from '../API';
import { SET_DIRECT_MESSAGES } from '../constants';

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

export const setDirectMessages = (directMessages) => {
	return {
		type: SET_DIRECT_MESSAGES,
		payload: directMessages,
	};
};
