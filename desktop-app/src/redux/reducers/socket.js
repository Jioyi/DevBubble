import {
	SET_MAIN_SOCKET,
	ADD_USER_STREAM,
	REMOVE_USER_STREAM,
	SET_VOICE_SOCKET
} from '../constants';

const initialState = {
	mainSocket: null,
	voiceSocket: null,
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
		case SET_VOICE_SOCKET:
			return {
				...state,
				voiceSocket: payload,
			};
		default:
			return state;
	}
};

export default socket;
