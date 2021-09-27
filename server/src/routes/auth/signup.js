const { Router } = require('express');
const router = Router();

const { User } = require('../../db');
const genPassword = require('../../utils/passwordUtils').genPassword;
const issueJWT = require('../../utils/passwordUtils').issueJWT;
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res, next) => {
	const { email, username, password } = req.body;

	if (!email || !username || !password) {
		return res.sendStatus(401);
	}
	console.log('email: ', email);
	console.log('username: ', username);
	console.log('password: ', password);

	const { genHash, salt } = genPassword(password);
	const ID = uuidv4();

	try {
		const user = await User.create({
			ID,
			email,
			hashed_password: genHash,
			salt,
			username,
		});
		const { token, expiresIn } = issueJWT(user);

		res.json({
			success: true,
			user,
			token,
			expiresIn,
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
