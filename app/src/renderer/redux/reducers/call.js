import {
  SET_OPEN_CALL,
} from '../constants';

const initialState = {
  type: 'invisible',
  openCall: false,
};

const call = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_OPEN_CALL:
      return {
        ...state,
        openCall: payload,
      };
    default:
      return state;
  }
};

export default call;
