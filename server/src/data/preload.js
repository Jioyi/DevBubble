const { User, Group, Channel } = require('../db.js');
const users = require('./users');
const groups = require('./groups');
const channels = require('./channels');
const preload = async () => {
	const usersCreated = await User.bulkCreate(users);

	const groupsCreated = await Group.bulkCreate(groups);
	await groupsCreated[0].setOwner(usersCreated[0].ID);
	await usersCreated[0].addGroup(groupsCreated[0]);
	await usersCreated[0].addGroup(groupsCreated[1]);
	await usersCreated[1].addGroup(groupsCreated[0]);

	const channelsCreated = await Channel.bulkCreate(channels);
	await groupsCreated[0].addChannel(channelsCreated[0]);
	await groupsCreated[0].addChannel(channelsCreated[1]);
	await groupsCreated[0].addChannel(channelsCreated[2]);
	await groupsCreated[0].addChannel(channelsCreated[3]);

};

module.exports = preload;
