import ClientSocketIO from 'socket.io-client';
import Peer from 'peerjs';
import {
	SET_MAIN_SOCKET,
	ADD_USER_STREAM,
	REMOVE_USER_STREAM,
	SET_VOICE_SOCKET,
} from '../constants';
import { setLoading } from './auth';
import store from '../../redux/store';

const SERVER_API_URL = 'http://localhost:3001'; // canviar a variable de entorno
let peer;

export const ConnectServerIO = (token) => {
	return async (dispatch) => {
		try {
			const socket = ClientSocketIO(SERVER_API_URL, {
				query: { token: token },
				secure: true,
				reconnection: true,
				rejectUnauthorized: false,
				reconnectionAttempts: 10,
			});
			socket.on('disconnect', async () => {
				dispatch(setLoading(true));
			});
			socket.on('connect', async () => {
				dispatch(setLoading(false));
			});
			/*socket.on('new-user-connected', async (user) => {
				dispatch(connectToNewUser(user));
			});*/
			dispatch(setMainSocket(socket));
		} catch (error) {
			console.log(error);
		}
	};
};

export const ConnectVoiceChannel = (channelID) => {
	return async (dispatch) => {
		try {
			const { user } = store.getState().auth;
			const socket = ClientSocketIO(SERVER_API_URL, {
				query: { voiceChannelID: channelID },
				secure: true,
				reconnection: true,
				rejectUnauthorized: false,
				reconnectionAttempts: 10,
			});
			socket.on('disconnect', async () => {
				console.log('estas desconectado');
			});
			socket.on('connect', async () => {
				console.log('estas conectado');
			});
			peer = new Peer();
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true,
			});
			socket.emit('join-channel-voice', user, channelID);
			dispatch(addUserStream(user, stream));
			peer.on('call', (call) => {
				call.answer(stream);
				const video = document.createElement('video');
				call.on('stream', (userVideoStream) => {
					console.log('ño');
					addUserStream(video, userVideoStream);
				});
			});
			dispatch(setVoiceSocket(socket));
		} catch (error) {
			console.log(error);
		}
	};
};

export const DisconnectVoiceChannel = () => {
	return async (dispatch) => {
		try {
			const { voiceSocket } = store.getState().socket;
			voiceSocket.disconnect();
			dispatch(setVoiceSocket(null));
		} catch (error) {
			console.log(error);
		}
	};
};

const connectToNewUser = (user) => {
	return async (dispatch) => {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true,
		});
		const call = peer.call(user, stream);
		call.on('stream', (userVideoStream) => {
			dispatch(addUserStream(user, userVideoStream));
		});
		call.on('close', () => {
			dispatch(removeUserStream(user.ID));
		});
	};
};

export const removeUserStream = (userID) => {
	return {
		type: REMOVE_USER_STREAM,
		payload: userID,
	};
};

export const addUserStream = (user, userVideoStream) => {
	user.src = userVideoStream;
	return {
		type: ADD_USER_STREAM,
		payload: user,
	};
};

export const setMainSocket = (socket) => {
	return {
		type: SET_MAIN_SOCKET,
		payload: socket,
	};
};

export const setVoiceSocket = (socket) => {
	return {
		type: SET_VOICE_SOCKET,
		payload: socket,
	};
};
