import axios from 'axios';
const API = axios.create({
	baseURL: 'http://localhost:3001',
	headers: {
		'Content-type': 'application/json',
	},
});
API.interceptors.request.use((req) => {
	if (window.localStorage.getItem('access_token')) {
		const token = window.localStorage.getItem('access_token');
		req.headers.Authorization = `Bearer ${token}`;
	}
	return req;
});

//auth route
export const login = (data) => API.post(`/auth/login`, data);
export const checkToken = () => API.get(`/auth/check_token`);

//user route
export const ChangeUserState = (state) =>
	API.put(`/user/change_state/${state}`);

//group route
export const createGroup = (data) =>
	API.post('/group', data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

//channel route
export const getChannels = (groupID) => API.get(`/channel/${groupID}`);
//directMessage route
export const getDirectMessages = () => API.get(`/directMessage/`);
