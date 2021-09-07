import { SET_DIRECT_MESSAGES } from '../constants';

const initialState = {
	directMessages: [],
};

const message = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_DIRECT_MESSAGES:
			return {
				...state,
				directMessages: payload,
			};
		default:
			return state;
	}
};

export default message;
