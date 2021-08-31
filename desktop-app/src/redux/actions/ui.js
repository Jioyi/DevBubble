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
