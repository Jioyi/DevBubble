const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { User } = require('./db');
const server = express();
const { checkTokenForSocketIO } = require('./security');
const http = require('http').createServer(server);

const socket = require('socket.io')(http, {
	cors: {
		origin: '*',
	},
});

socket.on('connection', async (socket) => {
	//conexion de usuario para notificaciones y mensaje globales
	if (socket.handshake.query.token) {
		const user = await checkTokenForSocketIO(socket.handshake.query.token);

		if (!user) return socket.disconnect();
		await User.update({ connected: true }, { where: { ID: user.ID } });

		socket.join(user.ID);
		console.log(`User ID:${user.ID} connected!`);

		socket.on('disconnect', async () => {
			await User.update({ connected: false }, { where: { ID: user.ID } });
			console.log(`User ID:${user.ID} disconnected!`);
		});

		//llamada entre usuarios
		/*socket.on('callUser', (data) => {
			socket.to(data.userToCall.ID).emit('ImCallingYou', {
				signal: data.signalData,
				from: data.from,
			});
		});
		socket.on('dontAcceptCall', (data) => {
			socket.to(data.userIncomingCall.ID).emit('dontAccept', {
				userCalled: data.userCalled,
			});
		});
		socket.on('acceptCall', (data) => {
			socket.to(data.to.ID).emit('callAccepted', data.signal);
		});*/
	}

	//llamada entre usuarios
	if (socket.handshake.query.calls) {
		const ID = socket.handshake.query.ID;
		socket.join(`Calls-${ID}`);
		
		socket.on('disconnect', async () => {});

		socket.on('callUser', (data) => {
			socket.to(`Calls-${data.userToCall.ID}`).emit('ImCallingYou', {
				signal: data.signalData,
				from: data.from,
			});
		});
		socket.on('dontAcceptCall', (data) => {
			socket.to(`Calls-${data.userIncomingCall.ID}`).emit('dontAccept', {
				userCalled: data.userCalled,
			});
		});
		socket.on('acceptCall', (data) => {
			socket.to(`Calls-${data.to.ID}`).emit('callAccepted', data.signal);
		});
	}

	//conexion a un voice channel
	if (socket.handshake.query.voice) {
		socket.on('join-channel-voice', (data) => {
			const { channelID, user } = data;
			socket.join(channelID);
			socket.broadcast.to(channelID).emit('new-user-connect', user);
			console.log(`voice-channel-${channelID}: new user connected!`);
			socket.on('disconnect', () => {
				socket.broadcast.to(channelID).emit('user-disconnected', user.ID);
				console.log(`voice-channel-${channelID}: user disconnected!`);
			});
		});
	}
});

server.use((req, res, next) => {
	req.socket = socket;
	next();
});

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use(express.json());
server.use(express.static(__dirname + '/public'));

server.use(
	cors({
		origin: '*',
	})
);

server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

server.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

server.use('/', require('./routes'));

module.exports = http;
