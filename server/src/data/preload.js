const {
	User,
	Group,
	Channel,
	DirectMessage,
	Message,
	SocialNetwork,
} = require('../db.js');
const users = require('./users');
const groups = require('./groups');
const channels = require('./channels');
const directMessages = require('./directMessages');
const socialNetworks = require('./socialNetworks');
const messages = require('./messages');

const preload = async () => {
	try {
		//creating Users
		const usersCreated = await User.bulkCreate(users);

		//creating Groups
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

		//creating Direct Messages
		const directMessagesCreated = await DirectMessage.bulkCreate(
			directMessages
		);
		await directMessagesCreated[0].addUser(usersCreated[0]);
		await directMessagesCreated[0].addUser(usersCreated[1]);

		//creating Messages
		const messagesCreadted = await Message.bulkCreate(messages);

		//creating Social Network links with user
		const socialNetworksCreadted = await SocialNetwork.bulkCreate(socialNetworks);

		
		//await usersCreated[0].addDirect_message(directMessagesCreated[0]);

		/*const use = await User.findByPk(usersCreated[0].ID, {
			include: [
				{
					model: DirectMessage,
					as: "direct_messages",
					attributes: ['ID'],
					through: { attributes: [] },
				},
			],
		});
		const use = await DirectMessage.findByPk(directMessagesCreated[0].ID, {
			include: [
				{
					model: User,
					as: "users",
					attributes: ['ID', 'email'],
					through: { attributes: [] },
				},
			],
		});*/
	} catch (error) {
		console.log('error', error);
	}
};

module.exports = preload;
