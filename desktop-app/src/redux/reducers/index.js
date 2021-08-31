import { combineReducers } from 'redux';
import ui from './ui.js';
import auth from './auth.js';
export default combineReducers({
	ui,
	auth,
});
