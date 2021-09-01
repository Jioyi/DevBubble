import { CHANGE_MIC_STATE, CHANGE_VOLUME_STATE, SET_OPEN_ADD_GROUP } from "../constants";
const remote = window.require ? window.require('electron').remote : null;
const WIN = remote.getCurrentWindow();

export const close = () => {
	return (dispatch) => {
		try {
			WIN.minimizeApp();
		} catch (error) {
			console.log(error);
		}
	};
};

export const minimize = () => {
	return (dispatch) => {
		try {
			WIN.minimize();
		} catch (error) {
			console.log(error);
		}
	};
};

export const maximize = () => {
	return (dispatch) => {
		try {
			if (WIN.isMaximized()) {
				WIN.unmaximize();
			} else {
				WIN.maximize();
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const changeVolumeState = () => {
	return {
		type: CHANGE_VOLUME_STATE,
		payload: null,
	};
};

export const changeMicState = () => {
	return {
		type: CHANGE_MIC_STATE,
		payload: null,
	};
};

export const setOpenAddGroup = (payload) => {
	return {
		type: SET_OPEN_ADD_GROUP,
		payload: payload,
	};
};

