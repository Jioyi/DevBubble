import {
	SET_MAIN_SOCKET,
	ADD_USER_STREAM,
	REMOVE_USER_STREAM,
} from '../constants';

const initialState = {
	mainSocket: undefined,
	videoContainer: [],
};

const socket = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_MAIN_SOCKET:
			return {
				...state,
				mainSocket: payload,
			};
		case ADD_USER_STREAM:
			return {
				...state,
				videoContainer: [...state.videoContainer, payload],
			};
		case REMOVE_USER_STREAM:
			return {
				...state,
				videoContainer: {
					...state.videoContainer.filter((user) => user.ID !== payload),
				},
			};
		default:
			return state;
	}
};

export default socket;
