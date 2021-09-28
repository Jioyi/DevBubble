const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { User } = require('./db');
const server = express();
const http = require('http').createServer(server);
const passport = require('passport');
const { validateToken } = require('./utils/passwordUtils');

/*********************   SOCKET CONFIG      ************************/

//  ****  ***   ***  *  *   *** *****
//  *    *   * *     * *   *      *
//   **  *   * *     **    * **   *
//     * *   * *     * *   *      *
//  ****  ***   ***  *  *   ***   *

const socket = require('socket.io')(http, {
	cors: {
		origin: '*',
	},
});

socket.on('connection', async (socket) => {
	//user connection only with token
	if (socket.handshake.query.token) {
		const userID = await validateToken(socket.handshake.query.token);
		if (!userID) return socket.disconnect();
		await User.update({ connected: true }, { where: { ID: userID } });

		socket.join(userID);
		console.log(`User ID:${userID} connected to socket IO!`);

		socket.on('disconnect', async () => {
			await User.update({ connected: false }, { where: { ID: userID } });
			console.log(`User ID:${userID} disconnected to socket IO!`);
		});

		//call between users
		socket.on('callUser', (data) => {
			socket.to(data.userToCall.ID).emit('ImCallingYou', {
				signal: data.signal,
				from: data.from,
			});
		});
		socket.on('acceptCall', (data) => {
			socket.to(data.to.ID).emit('callAccepted', data.signal);
		});
		socket.on('dontAcceptCall', (data) => {
			socket.to(data.to.ID).emit('dontAccept', {
				userCalled: data.userCalled,
			});
		});
		socket.on('cancelCall', (data) => {
			socket.to(data.to.ID).emit('userCancelCall', {
				userCalled: data.userCalled,
			});
		});
		socket.on('closeCall', (data) => {
			socket.to(data.to.ID).emit('userCloseCall');
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
//////////////////ENDS SOCKET CONFIG/////////////////

/************* SERVER CONFIG ***********************/
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(morgan('dev'));
server.use(express.json());
server.use(express.static(__dirname + '/public'));

server.use(
	cors({
		origin: '*',
	})
);
/////////////// ENDS SERVER CONFIG /////////////////////

/*********** CORS CONFIG **********************/
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
//////////////// ENDS CORS CONFIG ///////////////////////

/**************** PASSPORT JWT CONFIG ********************/
require('./passport')(passport);
server.use(passport.initialize());
/////////////// ENDS PASSPORT JWT CONFIG //////////////////

/********** ROUTES ****************************/
server.use('/', require('./routes'));
////////////////////////////////////////////////

/*********** ERROR HANDLER ********************/
server.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});
////////////////////////////////////////////////

module.exports = http;
