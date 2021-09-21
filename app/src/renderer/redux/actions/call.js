import { SET_OPEN_CALL } from '../constants';

export const setNewCall = () => {
  return (dispatch) => {
    dispatch(setOpenCall(true));
  };
};

export const setOpenCall = (boolean) => {
  return {
    type: SET_OPEN_CALL,
    payload: boolean,
  };
};
