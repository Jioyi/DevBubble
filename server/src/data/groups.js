const { v4: uuidv4 } = require('uuid');
const groups = [
	{
		ID: uuidv4(),
		name: 'Los Pythones',
		image: 'python.png',
	},
	{
		ID: uuidv4(),
		name: 'Java Lovers',
		image: 'java.png',
	},
];

module.exports = groups;
