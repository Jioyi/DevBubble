import ClientSocketIO from 'socket.io-client';
import { SET_MAIN_SOCKET } from '../constants';
import { setLoading } from './auth';

const SERVER_API_URL = 'http://localhost:3001'; // canviar a variable de entorno

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
			socket.on('connect', async () => {
				dispatch(setLoading(false));
			});
			socket.on('disconnect', async () => {
				dispatch(setLoading(true));
			});
			dispatch(setMainSocket(socket));
		} catch (error) {
			console.log(error);
		}
	};
};

export const setMainSocket = (socket) => {
	return {
		type: SET_MAIN_SOCKET,
		payload: socket,
	};
};
