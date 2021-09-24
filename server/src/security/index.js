const jwt = require('jsonwebtoken');
const SERVER_SECRET_KEY = process.env.SERVER_SECRET_KEY;

const checkToken = (req, res, next) => {
	if (!req.headers.authorization) {
		return res
			.status(403)
			.send({ success: false, message: 'No token provided.' });
	}
	const token = req.headers.authorization.replace('Bearer ', '');
	jwt.verify(token, SERVER_SECRET_KEY, (err, decoded) => {
		if (err) {
			res
				.status(403)
				.send({ success: false, message: 'Failed to authenticate user.' });
		} else {
			req.user = decoded;
			next();
		}
	});
};

const checkTokenForSocketIO = (token) => {
	return new Promise(async (resolve, reject) => {
		jwt.verify(token, SERVER_SECRET_KEY, (error, decoded) => {
			if (error) {
				resolve(null);
			} else {
				resolve(decoded);
			}
		});
	});
};

module.exports = {
	checkTokenForSocketIO,
	checkToken,
};