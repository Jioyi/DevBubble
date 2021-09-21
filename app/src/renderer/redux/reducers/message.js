import {
  SET_DIRECT_MESSAGES,
  SET_MESSAGES,
  ADD_MESSAGE,
  UPDATE_DIRECT_MESSAGE,
  SET_INPUT_SEARCH_MESSAGE,
  UPDATE_MESSAGE,
} from '../constants';

const initialState = {
  directMessages: [],
  messages: [],
  inputSearch: '',
};

const message = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DIRECT_MESSAGES:
      return {
        ...state,
        directMessages: payload,
      };
    case UPDATE_DIRECT_MESSAGE:
      return {
        ...state,
        directMessages: payload,
      };
    case UPDATE_MESSAGE:
      return {
        ...state,
        messages: payload,
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: payload,
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    case SET_INPUT_SEARCH_MESSAGE:
      return {
        ...state,
        inputSearch: payload,
      };
    default:
      return state;
  }
};

export default message;
