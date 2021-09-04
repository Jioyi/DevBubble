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
	const user = await checkTokenForSocketIO(socket.handshake.query.token);
	if (!user) return socket.disconnect();

	await User.update({ connected: true }, { where: { ID: user.ID } });
	socket.join(user.ID);
	console.log(`User ID:${user.ID} connected!`);

	socket.on('join-channel-voice', (channelID) => {
		socket.join(channelID);
		socket.broadcast.to(channelID).emit('new-user-connected', user);
		console.log('new connetion id channel:', channelID);
		socket.on('disconnect', () => {
			socket.broadcast.to(channelID).emit('user-disconnected', user.ID);
		});
	});

	socket.on('disconnect', async () => {
		await User.update({ connected: false }, { where: { ID: user.ID } });
		console.log(`User ID:${user.ID} disconnected!`);
	});
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
		origin: process.env.CLIENT_URL,
	})
);

server.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
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
