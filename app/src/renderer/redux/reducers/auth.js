import {
  SET_TOKEN,
  SET_USER,
  SET_HIDDEN_LIST,
  ADD_HIDDEN_ITEM,
  SET_AUTHENTICATE,
  SET_LOADING,
  SET_IS_ERROR,
  SET_SOCKET_STATE,
} from '../constants';
import store from '../store/myStore';

const user = JSON.parse(store.getItem('user'));
const token = store.getItem('access_token');

const initialState = {
  user: user ? user : null,
  // para qué es hidden list
  hidden_list: [],
  token: token ? token : null,
  isAuthenticated: user && token ? true : false,
  isLoading: true,
  isError: true,
  socketState: '',
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
    case SET_HIDDEN_LIST:
      return {
        ...state,
        hidden_list: payload,
      };
    case ADD_HIDDEN_ITEM:
      return {
        ...state,
        hidden_list: [...state.hidden_list, payload],
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
    case SET_IS_ERROR:
      return {
        ...state,
        isError: payload
      }
    case SET_SOCKET_STATE:
      return {
        ...state,
        socketState: payload,
      };
    default:
      return state;
  }
};

export default auth;
