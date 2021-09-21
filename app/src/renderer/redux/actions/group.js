import store from '../store/myStore';
import * as API from '../API';
import {
  SET_GROUPS,
  SET_SELECT_GROUP,
  ADD_GROUP,
  SET_CHANNELS,
} from '../constants';
import { setOpenAddGroup, setMessageAlert, setOpenAlert } from './ui';

export const createGroup = (image, name) => {
  return async (dispatch) => {
    try {
      let formData = new FormData();
      formData.append('name', name);
      formData.append('file', image);
      const response = await API.createGroup(formData);
      if (response.data?.message === 'successful') {
        dispatch(addGroup(response.data.group));
        dispatch(setOpenAddGroup(false));
      } else {
        dispatch(setOpenAddGroup(false));
      }
    } catch (error) {
      console.log('error create group', error);
      dispatch(setOpenAddGroup(false));
      dispatch(
        setMessageAlert(
          'Solo puedes utilizar formato de imagenes gif, jpg, jpeg y png.'
        )
      );
      dispatch(setOpenAlert(true));
      //mostrar un error
    }
  };
};

export const addGroup = (newGroup) => {
  return {
    type: ADD_GROUP,
    payload: newGroup,
  };
};

export const setGroups = (groups) => {
  return {
    type: SET_GROUPS,
    payload: groups,
  };
};

export const setGroupSelectedID = (IDGroup) => {
  store.setItem('group_selected_id', IDGroup);
  return {
    type: SET_SELECT_GROUP,
    payload: IDGroup,
  };
};

// channels
export const getChannels = (groupID) => {
  return async (dispatch) => {
    try {
      const response = await API.getChannels(groupID);
      if (response.data?.message === 'successful') {
        dispatch(setChannels(response.data.channels));
      } else {
        //mostrar un error
      }
    } catch (error) {
      console.log('error getChannels', error);
      //mostrar un error
    }
  };
};

export const setChannels = (channels) => {
  return {
    type: SET_CHANNELS,
    payload: channels,
  };
};
