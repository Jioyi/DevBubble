import {
	SET_TOKEN,
	SET_USER,
	SET_AUTHENTICATE,
	SET_LOADING,
} from '../constants';

const user = JSON.parse(window.localStorage.getItem('user'));
const token = window.localStorage.getItem('access_token');
const userEmpy = {
	ID: null,
};
console.log("user store:", user);
console.log("token store:", token);
const initialState = {
	user: user ? user : userEmpy,
	token: token ? token : null,
	isAuthenticated: user && token ? true : false,
	isLoading: true,
	ischeckingCode: false,
};

const auth = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_TOKEN:
			return {
				...state,
				token: payload,
			};
		case SET_USER:
			return {
				...state,
				user: payload,
			};
		case SET_AUTHENTICATE:
			return {
				...state,
				isAuthenticated: payload,
			};
		case SET_LOADING:
			return {
				...state,
				isLoading: payload,
			};
		default:
			return state;
	}
};

export default auth;
