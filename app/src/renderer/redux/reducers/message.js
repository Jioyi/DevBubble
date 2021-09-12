import { SET_DIRECT_MESSAGES, SET_MESSAGES } from '../constants';

const initialState = {
  directMessages: [],
  messages: [],
};

const message = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DIRECT_MESSAGES:
      return {
        ...state,
        directMessages: payload,
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: payload,
      };
    default:
      return state;
  }
};

export default message;
