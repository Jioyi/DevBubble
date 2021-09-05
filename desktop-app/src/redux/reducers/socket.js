import { SET_MAIN_SOCKET } from '../constants';

const initialState = {
	mainSocket: null,
};

const socket = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_MAIN_SOCKET:
			return {
				...state,
				mainSocket: payload,
			};
		default:
			return state;
	}
};

export default socket;
