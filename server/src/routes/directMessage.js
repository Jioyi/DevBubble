const { Router } = require('express');
const router = Router();
const { v4: uuidv4 } = require('uuid');
const { checkToken } = require('../security');
const { User, DirectMessage, Message } = require('../db.js');

router.get('/', checkToken, async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { ID: req.user.ID },
			attributes: ['ID'],
			include: [
				{
					model: DirectMessage,
					as: 'direct_messages',
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
				},
			],
		});
		return res.json({
			message: 'successful',
			direct_messages: user.direct_messages ? user.direct_messages : [],
		});
	} catch (error) {
		next(error);
	}
});

router.post('/', checkToken, async (req, res, next) => {
	try {
		const { ID, message } = req.body;
		await Message.create({
			ID: uuidv4(),
			content: message,
			DirectMessageID: ID,
			UserID: req.user.ID,
		});
		return res.json({
			message: 'successful',
		});
	} catch (error) {
		next(error);
	}
});

router.get('/find/:ID', checkToken, async (req, res, next) => {
	try {
		const { ID } = req.params;
		const directMessage = await DirectMessage.findOne({
			where: { ID: ID },
			attributes: ['ID'],
			include: [
				{
					model: Message,
					as: 'messages',
					attributes: ['ID', 'content'],
					include: [
						{
							model: User,
							as: 'user',
							attributes: ['ID', 'username', "avatar"],
						},
					],
				},
			],
		});
		return res.json({
			message: 'successful',
			messages: directMessage.messages,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
