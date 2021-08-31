import { CHANGE_VOLUME_STATE, CHANGE_MIC_STATE } from '../constants';

const initialState = {
	volume: true,
	mic: true,
};

const ui = (state = initialState, action) => {
	const { type } = action;
	switch (type) {
		case CHANGE_VOLUME_STATE:
			return {
				...state,
				volume: !state.volume,
			};
		case CHANGE_MIC_STATE:
			return {
				...state,
				mic: !state.mic,
			};
		default:
			return state;
	}
};

export default ui;
