import {
	CHANGE_VOLUME_STATE,
	CHANGE_MIC_STATE,
	SET_OPEN_ADD_GROUP,
	SET_USER_STATE
} from '../constants';

const initialState = {
	userState: 'invisible',
	volume: true,
	mic: true,
	openAddGroup: false,
};

const ui = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case CHANGE_VOLUME_STATE:
			return {
				...state,
				mic: !state.volume ? true : false,
				volume: !state.volume,
			};
		case CHANGE_MIC_STATE:
			return {
				...state,
				mic: !state.mic,
				volume: !state.mic ? true : state.volume,
			};
		case SET_OPEN_ADD_GROUP:
			return {
				...state,
				openAddGroup: payload,
			};
		case SET_USER_STATE:
			return {
				...state,
				userState: payload,
			};
		default:
			return state;
	}
};

export default ui;
