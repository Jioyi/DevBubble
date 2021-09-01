import * as API from '../API';
import { setOpenAddGroup } from './ui';

export const createGroup = (image, name) => {
	return async (dispatch) => {
		try {
			let formData = new FormData();
			formData.append('name', name);
			formData.append('file', image);
			const response = await API.createGroup(formData);
			if (response.data?.message === 'successful') {
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
