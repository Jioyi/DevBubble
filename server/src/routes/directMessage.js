const { Router } = require('express');
const router = Router();
const { v4: uuidv4 } = require('uuid');
const { checkToken } = require('../security');
const { sendAlertMessage } = require('./../alerts');
const { User, DirectMessage, Message } = require('../db.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
		const messageCreated = await Message.create({
			ID: uuidv4(),
			content: message,
			DirectMessageID: ID,
			UserID: req.user.ID,
		});
		const messageInfo = await Message.findOne({
			where: { ID: messageCreated.ID },
			attributes: ['ID', 'content', 'createdAt', 'DirectMessageID'],
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['ID', 'username', 'avatar'],
				},
			],
		});
		sendAlertMessage(req, messageInfo);
		return res.json({
			message: 'successful',
			data: messageInfo,
		});
	} catch (error) {
		next(error);
	}
});

//no usada
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
					attributes: ['ID', 'content', 'createdAt'],
					include: [
						{
							model: User,
							as: 'user',
							attributes: ['ID', 'username', 'avatar'],
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

router.post('/find/:ID', checkToken, async (req, res, next) => {
	try {
		const { ID } = req.params;
		const { limit, offset } = req.body;
		console.log(`test: limit-${limit} offset-${offset}`);
		const messages = await Message.findAndCountAll({
			where: { DirectMessageID: ID },
			attributes: ['ID', 'content', 'createdAt'],
			order: [['createdAt', 'DESC']],
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['ID', 'username', 'avatar'],
				},
			],
			offset,
			limit,
		});
		const has_more = messages.rows.length === limit ? true : false;
		return res.json({
			message: 'successful',
			items: messages.rows,
			has_more: has_more,
		});
	} catch (error) {
		next(error);
	}
});

router.post('/sendMessageToUser/', checkToken, async (req, res, next) => {
	try {
		const { UserID, message } = req.body;
		const user = await User.findOne({
			where: {
				ID: req.user.ID,
			},
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
		//filtra los DirectMessage del user para ver si ya tiene un MD con el usuario al que le envia un mensaje
		const filtered = user.direct_messages.filter((directMessage) => {
			if (directMessage.users.length > 2 || directMessage.users.length < 2) {
				return false;
			}
			let count = 0;
			for (let i in directMessage.users) {
				if (
					directMessage.users[i].ID === UserID ||
					directMessage.users[i].ID === req.user.ID
				) {
					count++;
				}
			}
			if (count === 2) return true;
			return false;
		});
		if (filtered.length > 0) {
			//usar MD existente con los dos usuarios
			const messageCreated = await Message.create({
				ID: uuidv4(),
				content: message,
				DirectMessageID: filtered[0].ID,
				UserID: req.user.ID,
			});
			const messageInfo = await Message.findOne({
				where: { ID: messageCreated.ID },
				attributes: ['ID', 'content', 'createdAt', 'DirectMessageID'],
				include: [
					{
						model: User,
						as: 'user',
						attributes: ['ID', 'username', 'avatar'],
					},
				],
			});
			sendAlertMessage(req, messageInfo);
			return res.json({
				message: 'successful',
				data: messageInfo,
			});
		} else {
			//crear nuevo MD
			const directMessageCreated = await DirectMessage.create({
				ID: uuidv4(),
			});
			await directMessageCreated.addUsers([UserID, req.user.ID]);
			const messageCreated = await Message.create({
				ID: uuidv4(),
				content: message,
				DirectMessageID: directMessageCreated.ID,
				UserID: req.user.ID,
			});
			const messageInfo = await Message.findOne({
				where: { ID: messageCreated.ID },
				attributes: ['ID', 'content', 'createdAt', 'DirectMessageID'],
				include: [
					{
						model: User,
						as: 'user',
						attributes: ['ID', 'username', 'avatar'],
					},
				],
			});
			sendAlertMessage(req, messageInfo);
			return res.json({
				message: 'successful',
				data: messageInfo,
			});
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
