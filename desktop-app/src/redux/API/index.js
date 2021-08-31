import axios from 'axios';
const { SERVER_API_URL } = process.env;
const API = axios.create({ baseURL: SERVER_API_URL });

API.interceptors.request.use((req) => {
	if (window.localStorage.getItem('access_token')) {
		const token = window.localStorage.getItem('access_token');
		req.headers.Authorization = `Bearer ${token}`;
	}
	return req;
});

//auth route
export const login = (email, password) =>
	API.get(`/auth/login?email=${email}&password=${password}`);
