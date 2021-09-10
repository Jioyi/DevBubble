import {
	SET_GROUPS,
	SET_SELECT_GROUP,
	ADD_GROUP,
	SET_CHANNELS,
} from '../constants';

const groupSelectedID = window.localStorage.getItem('group_selected_id');
const initialState = {
	groups: [],
	groupSelectedID: groupSelectedID ? groupSelectedID : null,
	channels: [],
};

const group = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_GROUPS:
			return {
				...state,
				groups: payload,
			};
		case SET_CHANNELS:
			return {
				...state,
				channels: payload,
			};
		case SET_SELECT_GROUP:
			return {
				...state,
				groupSelectedID: payload,
			};
		case ADD_GROUP:
			return {
				...state,
				groups: [...state.groups, payload],
			};
		default:
			return state;
	}
};

export default group;
