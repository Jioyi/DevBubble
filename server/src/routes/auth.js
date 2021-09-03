const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const { User, Group } = require('../db.js');
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
			attributes: ['ID', 'email', 'avatar', 'password'],
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
			attributes: ['ID', 'email', 'avatar', 'state'],
			include: [
				{
					model: Group,
					as: 'groups',
					attributes: ['ID', 'name', 'image'],
					through: {
						attributes: [],
					},
				},
			],
		});
		let auxUser = user.toJSON();
		delete auxUser.groups;
		const token = jwt.sign(auxUser, SERVER_SECRET_KEY, {
			expiresIn: 604800,
		});
		return res.status(200).json({
			message: 'successful',
			user: auxUser,
			groups: user.groups,
			token: token,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
