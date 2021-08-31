import * as API from '../API';
import {
	SET_TOKEN,
	SET_USER,
	SET_AUTHENTICATE,
	SET_LOADING,
} from '../constants';

export const login = (email, password) => {
	return async (dispatch) => {
		try {
			const response = await API.login({ email, password });
			if (response.data?.message === 'successful') {
				console.log('user', response.data.user);
				dispatch(setUser(response.data.user));
				dispatch(setToken(response.data.token));
				dispatch(setAuthenticate(true));
				//dispatch(ConnectServerIO(token));
			} else {
				dispatch(logOut());
			}
		} catch (error) {
			console.log("error login", error);
			dispatch(logOut());
		}
	};
};

export const logOut = () => {
	return (dispatch) => {
		window.localStorage.removeItem('user');
		window.localStorage.removeItem('access_token');
		dispatch(setToken(null));
		dispatch(setUser(null));
		dispatch(setAuthenticate(false));
	};
};

export const setUser = (user) => {
	window.localStorage.setItem('user', JSON.stringify(user));
	return {
		type: SET_USER,
		payload: user,
	};
};

export const setToken = (token) => {
	window.localStorage.setItem('access_token', token);
	return {
		type: SET_TOKEN,
		payload: token,
	};
};

export const setAuthenticate = (bolean) => {
	return {
		type: SET_AUTHENTICATE,
		payload: bolean,
	};
};

export const setLoading = (bolean) => {
	return {
		type: SET_LOADING,
		payload: bolean,
	};
};

export const callbackTest = (time) => {
	return new Promise((resolve) => setTimeout(resolve, time));
};
