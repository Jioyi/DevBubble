const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const { User, Group, Hidden } = require('../db.js');
const Bcrypt = require('bcrypt');
const { checkToken } = require('../security');
const { SERVER_SECRET_KEY } = process.env;

router.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (email === '' || password === '') {
			return res.status(400).json({
				message: 'Bad request!',
			});
		}
		const user = await User.findOne({
			where: {
				email: email,
			},
			attributes: ['ID', 'email', 'avatar', 'password', 'username'],
		});
		if (!user) {
			return res.status(400).json({
				message: 'Bad request!',
			});
		}
		if (!Bcrypt.compareSync(password, user.password)) {
			return res.status(400).json({
				message: 'Invalid password!',
			});
		}
		let auxUser = user.toJSON();
		delete auxUser.password;
		const token = jwt.sign(auxUser, SERVER_SECRET_KEY, {
			expiresIn: 604800,
		});
		return res.status(200).json({
			message: 'successful',
			user: auxUser,
			token: token,
		});
	} catch (error) {
		next(error);
	}
});

router.get('/check_token', checkToken, async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { ID: req.user.ID },
			attributes: ['ID', 'email', 'avatar', 'state', 'username'],
			include: [
				{
					model: Group,
					as: 'groups',
					attributes: ['ID', 'name', 'image', 'ownerID'],
					through: {
						attributes: [],
					},
				},
				{
					model: Hidden,
					as: 'hidden_list',
					attributes: ['ID', 'DirectMessageID'],
				},
			],
		});
		let hidden_list = [];
		user.hidden_list.forEach((item) => {
			hidden_list.push(item.DirectMessageID);
		});
		let auxUser = user.toJSON();
		delete auxUser.groups;
		delete auxUser.hidden_list;
		const token = jwt.sign(auxUser, SERVER_SECRET_KEY, {
			expiresIn: 604800,
		});
		return res.status(200).json({
			message: 'successful',
			user: auxUser,
			groups: user.groups,
			hidden_list: hidden_list,
			token: token,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
