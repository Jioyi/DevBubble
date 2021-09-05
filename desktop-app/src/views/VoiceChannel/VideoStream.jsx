import React, { useEffect } from 'react';

const VideoStream = ({ user, myID }) => {
	useEffect(() => {
		const container = document.getElementById(`container-${user.ID}`);
		const video = document.createElement('video');
		if (user.ID === myID) video.muted = true;
		video.srcObject = user.stream;
		video.id = user.ID;
		video.autoplay = true;
		video.style.width = '100%';
		video.style.height = 'auto';
		container.appendChild(video);
	}, []);

	return <div id={`container-${user.ID}`}></div>;
};

export default VideoStream;
