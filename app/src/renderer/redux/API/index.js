import axios from 'axios';
const { SERVER_API_URL } = process.env;
const isElectron = require('is-electron');
const electron = isElectron();
const store = electron ? window.localStorage : localStorage;

const API = axios.create({
  baseURL: SERVER_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

API.interceptors.request.use((req) => {
  if (store.getItem('access_token')) {
    const token = store.getItem('access_token');
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
export const getMessages = (DirectMessageID) => API.get(`/directMessage/find/${DirectMessageID}`);
export const getDirectMessages = () => API.get(`/directMessage/`);
export const sendMessage = (data) => API.post(`/directMessage/`, data);

