import { SET_GROUPS, SELECT_GROUP, ADD_GROUP } from '../constants';

const groupSelected = window.localStorage.getItem('group_selected');
const initialState = {
	groups: [],
	groupSelected: groupSelected ? groupSelected : null,
};

const group = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_GROUPS:
			return {
				...state,
				groups: payload,
			};
		case SELECT_GROUP:
			return {
				...state,
				groupSelected: payload,
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
