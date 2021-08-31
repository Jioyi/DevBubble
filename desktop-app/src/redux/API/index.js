import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:3001' });
API.interceptors.request.use((req) => {
	if (window.localStorage.getItem('access_token')) {
		const token = window.localStorage.getItem('access_token');
		req.headers.Authorization = `Bearer ${token}`;
	}
	return req;
});

//auth route
export const login = (data) => API.post(`/auth/login`, data);
