import ClientSocketIO from 'socket.io-client';
import Peer from 'peerjs';

const SERVER_API_URL = 'http://localhost:3001'; // canviar a variable de entorno

const initializePeerConnection = () => {
	return new Peer();
};

const initializeSocketConnection = () => {
	return ClientSocketIO(SERVER_API_URL, {
		query: { voice: true },
		secure: true,
		reconnection: true,
		rejectUnauthorized: false,
		reconnectionAttempts: 15,
	});
};

class voiceSocket {
	socketInstance;
	container = [];
	message = [];
	settings;
	streaming = false;
	myPeer;
	peers;
	mySocket;
	myUser;
	voiceChannelID = '';

	constructor(voiceChannelID, user) {
		this.voiceChannelID = voiceChannelID;
		this.myUser = user;
		this.myPeer = initializePeerConnection();
		this.mySocket = initializeSocketConnection();
		this.initializeSocketEvents();
		this.initializePeersEvents();
	}

	initializeSocketEvents = () => {
		this.mySocket.on('connect', () => {
			console.log('socket connected');
		});
		this.mySocket.on('user-disconnected', (userID) => {
			console.log('user disconnected-- closing peers', userID);
			this.peers[userID] && this.peers[userID].close();
			this.removeVideo(userID);
		});
		this.mySocket.on('disconnect', () => {
			console.log('socket disconnected');
		});
		this.mySocket.on('error', (err) => {
			console.log('socket error: ', err);
		});
	};

	initializePeersEvents = () => {
		this.myPeer.on('open', () => {
			console.log('peers established and joined room');
			this.mySocket.emit('join-channel-voice', {
				channelID: this.voiceChannelID,
				user: this.myUser,
			});
			this.getVideoAudioStream().then((stream) => {
				if (stream) {
					this.streaming = true;
					this.createVideo(this.myUser, stream);
					this.setPeersListeners(stream);
					this.newUserConnection(stream);
				}
			});
		});
		this.myPeer.on('error', (err) => {
			console.log('peer connection error', err);
			this.myPeer.reconnect();
		});
	};

	getVideoAudioStream = (video = true, audio = true) => {
		const myNavigator =
			navigator.mediaDevices.getUserMedia ||
			navigator.mediaDevices.webkitGetUserMedia ||
			navigator.mediaDevices.mozGetUserMedia ||
			navigator.mediaDevices.msGetUserMedia;
		return myNavigator({
			video: video
				? {
						frameRate: 35,
						noiseSuppression: true,
						width: { min: 640, ideal: 1280, max: 1920 },
						height: { min: 480, ideal: 720, max: 1080 },
				  }
				: false,
			audio: audio,
		});
	};

	createVideo = (user, stream) => {
		if (!this.container[user.ID]) {
			this.container[user.ID] = { ...user, stream: stream };
		}
	};

	setPeersListeners = (stream) => {
		this.myPeer.on('call', (call) => {
			call.answer(stream);
			call.on('stream', (userStream) => {
				console.log('user stream data', userStream);
				this.createVideo({ id: call.metadata.id, stream: userStream });
			});
			call.on('close', () => {
				console.log('closing peers listeners', call.metadata.id);
				this.removeVideo(call.metadata.id);
			});
			call.on('error', () => {
				console.log('peer error ------');
				this.removeVideo(call.metadata.id);
			});
			this.peers[call.metadata.id] = call;
		});
	};

	newUserConnection = (stream) => {
		this.mySocket.on('new-user-connect', (user) => {
			console.log('New User Connected', user);
			const { ID } = user;
			const call = this.myPeer.call(ID, stream, {
				metadata: { id: this.myID },
			});
			call.on('stream', (userStream) => {
				//this.createVideo({ id: userID, stream: userStream });
			});
			call.on('close', (userID) => {
				console.log('closing new user', userID);
				this.removeVideo(userID);
			});
			call.on('error', (userID) => {
				console.log('peer error ------');
				this.removeVideo(userID);
			});
			//this.peers[userID] = call;
		});
	};

	removeVideo = (userID) => {
		delete this.container[userID];
		//const video = document.getElementById(userID);
		//if (video) video.remove();
	};

	destoryConnection = () => {
		//const myMediaTracks = this.videoContainer[this.myID]?.stream.getTracks();
		/*myMediaTracks?.forEach((track: any) => {
			track.stop();
		});*/
		//socketInstance?.socket.disconnect();
		this.myPeer.destroy();
	};
}

export default voiceSocket;
