const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const { organizeUser } = require('./../utils');
const { User } = require('../db.js');
const Bcrypt = require('bcrypt');
const { SERVER_SECRET_KEY } = process.env;

router.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (email === '' || password === '') {
			return res.json({
				message: 'Bad request!',
			});
		}
		const user = await User.findOne({
			where: {
				email: email,
			},
		});
		if (!user) {
			return res.json({
				message: 'Bad request!',
			});
		}
		if (!Bcrypt.compareSync(password, user.password)) {
			return res.json({
				message: 'Invalid password!',
			});
		}
		const organizedUser = organizeUser(user);
		const token = jwt.sign(organizedUser, SERVER_SECRET_KEY, {
			expiresIn: 604800,
		});
		return res.json({
			message: 'successful',
			user: organizedUser,
			token: token,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
