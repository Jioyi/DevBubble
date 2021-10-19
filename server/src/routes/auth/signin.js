const { Router } = require('express');
const router = Router();

const { User } = require('../../db');
const { validatePassword, issueJWT } = require('./../../utils/passwordUtils');

router.post('/', (req, res, next) => {
	const { email, password } = req.body;


	if (!email || !password) {
		return res.sendStatus(401);
	}

	User.findOne({ where: { email }	})
		.then((user) => {
			if (!user) return res.sendStatus(401);
			const validation = validatePassword(
				password,
				user.hashed_password,
				user.salt
			);
			if (!validation) return res.sendStatus(401);
			
			user = {
				ID: user.ID,
				username: user.username,
				email: user.email,
				avatar: user.avatar,
				connected: user.connected,
				state: user.state
			}

			const { token, expiresIn } = issueJWT(user);
			res.cookie('access_token', token,{
				// domain: 'localhost:3000',
				httpOnly: true,
				     //  ms  *  s = 1m
				maxAge: 1000 * 60,
				//sameSite: true 
			});
			res.json({
				success: true,
				user
			});
		})
		.catch((err) => {
			next(err);
		});
});

module.exports = router;
