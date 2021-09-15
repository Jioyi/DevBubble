const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const { User, DirectMessage, Message } = require('../db.js');

const sendAlertMessage = async (req, messageInfo) => {
	try {
		const directMessageInfo = await DirectMessage.findOne({
			where: { ID: messageInfo.DirectMessageID },
			attributes: ['ID'],
			through: { attributes: [] },
			include: [
				{
					model: User,
					as: 'users',
					attributes: ['ID', 'connected', 'state', 'username', 'avatar'],
					through: { attributes: [] },
				},
			],
		});
		for (let i in directMessageInfo.users) {
			if (directMessageInfo.users[i].ID !== req.user.ID) {
				req.socket
					.to(directMessageInfo.users[i].ID)
					.emit('ALERT_NEW_MESSAGE', { messageInfo, directMessageInfo });
			}
		}
	} catch (error) {
		console.log(error);
		return error;
	}
};

module.exports = {
	sendAlertMessage,
};
