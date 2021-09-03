import * as API from '../API';
import { SET_GROUPS, SELECT_GROUP, ADD_GROUP } from '../constants';
import { setOpenAddGroup } from './ui';

export const createGroup = (image, name) => {
	return async (dispatch) => {
		try {
			let formData = new FormData();
			formData.append('name', name);
			formData.append('file', image);
			const response = await API.createGroup(formData);
			if (response.data?.message === 'successful') {
				dispatch(addGroup(response.data.group));
				dispatch(setOpenAddGroup(false));
			} else {
				dispatch(setOpenAddGroup(false));
				//mostrar un error
			}
		} catch (error) {
			console.log('error create group', error);
			dispatch(setOpenAddGroup(false));
			//mostrar un error
		}
	};
};

export const addGroup = (newGroup) => {
	return {
		type: ADD_GROUP,
		payload: newGroup,
	};
};

export const setGroups = (groups) => {
	return {
		type: SET_GROUPS,
		payload: groups,
	};
};

export const selectGroup = (IDGroup) => {
	window.localStorage.setItem('group_selected', IDGroup);
	return {
		type: SELECT_GROUP,
		payload: IDGroup,
	};
};

