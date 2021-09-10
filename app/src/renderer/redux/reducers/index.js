import { combineReducers } from 'redux';
import ui from './ui.js';
import auth from './auth.js';
import group from './group.js';
import socket from './socket.js';
import voice from './voice.js';
import message from './message.js';
export default combineReducers({
	ui,
	auth,
	group,
	socket,
	voice,
	message
});
