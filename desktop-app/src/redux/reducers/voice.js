import {
	SET_VOICE_SOCKET,
	SET_PEER,
	SET_VOICE_CHANNEL_ID,
	SET_STREAMING,
	ADD_STREAMING,
	SET_STREAMINGS
} from '../constants';

const initialState = {
	voiceChannelID: '',
	socket: null,
	peer: null,
	streaming: false,
	streamings: [],
};

const voice = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_VOICE_CHANNEL_ID:
			return {
				...state,
				voiceChannelID: payload,
			};
		case SET_VOICE_SOCKET:
			return {
				...state,
				socket: payload,
			};
		case SET_PEER:
			return {
				...state,
				peer: payload,
			};
		case SET_STREAMING:
			return {
				...state,
				streaming: payload,
			};
		case SET_STREAMINGS:
			return {
				...state,
				streamings: payload,
			};
		case ADD_STREAMING:
			return {
				...state,
				streamings: [...state.streamings, payload],
			};
		default:
			return state;
	}
};

export default voice;
