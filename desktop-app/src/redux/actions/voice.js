import ClientSocketIO from 'socket.io-client';
import {
	SET_VOICE_SOCKET,
	SET_PEER,
	SET_VOICE_CHANNEL_ID,
	SET_STREAMING,
	SET_STREAMINGS,
	ADD_STREAMING,
} from '../constants';
import Peer from 'peerjs';
import store from '../store';

const SERVER_API_URL = 'http://localhost:3001'; // canviar a variable de entorno

export const createSocketVoice = (channelID) => {
	return async (dispatch) => {
		try {
			dispatch(setVoiceChannelID(channelID));

			const socket = ClientSocketIO(SERVER_API_URL, {
				query: { voice: true },
				secure: true,
				reconnection: true,
				rejectUnauthorized: false,
				reconnectionAttempts: 15,
			});
			dispatch(setVoiceSocket(socket));

			const peer = new Peer();
			dispatch(setPeer(peer));

			dispatch(initializeSocketEvents());
			dispatch(initializePeersEvents());
		} catch (error) {
			console.log(error);
		}
	};
};

const initializeSocketEvents = () => {
	return async (dispatch) => {
		const { socket } = store.getState().voice;
		socket.on('connect', () => {
			console.log('socket connected');
		});
		socket.on('user-disconnected', (userID) => {
			console.log('user disconnected-- closing peers', userID);
			//peers[userID] && peers[userID].close();
			//this.removeVideo(userID);
		});
		socket.on('disconnect', () => {
			console.log('socket disconnected --');
		});
		socket.on('error', (err) => {
			console.log('socket error --', err);
		});
	};
};

const initializePeersEvents = () => {
	return async (dispatch) => {
		const { peer, socket, voiceChannelID } = store.getState().voice;
		const { user } = store.getState().auth;
		peer.on('open', async () => {
			console.log('peers established and joined room');
			socket.emit('join-channel-voice', {
				channelID: voiceChannelID,
				user: user,
			});
			const stream = await navigator.mediaDevices.getUserMedia({
				video: true,
				audio: true,
			});
			if (stream) {
				dispatch(setStreaming(true));
				dispatch(addStreaming(user, stream));
				dispatch(setPeersListeners(stream));
				//this.newUserConnection(stream);
			}
		});
		peer.on('error', (err) => {
			console.log('peer connection error', err);
			peer.reconnect();
		});
	};
};

export const setPeersListeners = (stream) => {
	return async (dispatch) => {
		const { peer, socket, voiceChannelID } = store.getState().voice;
		peer.on('call', (call) => {
			call.answer(stream);
			call.on('stream', (userStream) => {
				console.log('user stream data', userStream);
				//this.createVideo({ id: call.metadata.id, stream: userStream });
			});
			call.on('close', () => {
				console.log('closing peers listeners', call.metadata.id);
				//this.removeVideo(call.metadata.id);
			});
			call.on('error', () => {
				console.log('peer error ------');
				this.removeVideo(call.metadata.id);
			});
			//peers[call.metadata.id] = call;
		});
	};
};

export const addStreaming = (user, stream) => {
	const { streamings } = store.getState().voice;
	if (!streamings.some((oldUser) => oldUser.ID === user.ID)) {
		return {
			type: ADD_STREAMING,
			payload: { ...user, stream: stream },
		};
	}
};

export const setVoiceChannelID = (ID) => {
	return {
		type: SET_VOICE_CHANNEL_ID,
		payload: ID,
	};
};

export const setPeer = (peer) => {
	return {
		type: SET_PEER,
		payload: peer,
	};
};

export const setVoiceSocket = (socket) => {
	return {
		type: SET_VOICE_SOCKET,
		payload: socket,
	};
};

export const setStreaming = (boolean) => {
	return {
		type: SET_STREAMING,
		payload: boolean,
	};
};

export const setStreamings = (streamings) => {
	console.log('super ño');
	return {
		type: SET_STREAMINGS,
		payload: streamings,
	};
};

export const disconnectVoiceChannel = () => {
	const myID = store.getState().auth.user.ID;
	const { socket, peer, streamings } = store.getState().voice;
	const myStreaming = streamings.find((stream) => stream.ID === myID).stream;
	const myMediaTracks = myStreaming.getTracks();
	myMediaTracks?.forEach((track) => {
		track.stop();
	});
	socket.disconnect();
	peer.destroy();
	return async (dispatch) => {
		dispatch(setVoiceChannelID(''));
		dispatch(setStreamings([]));
		dispatch(setStreaming(false));
		dispatch(setVoiceSocket(null));
		dispatch(setPeer(null));
	};
};
