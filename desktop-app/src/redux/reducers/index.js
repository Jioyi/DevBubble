import { combineReducers } from 'redux';
import ui from './ui.js';
import auth from './auth.js';
import group from './group.js';
import socket from './socket.js';
export default combineReducers({
	ui,
	auth,
	group,
	socket,
});
