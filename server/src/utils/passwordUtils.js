const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');

const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, './../cryptography/id_rsa_pri.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

const genPassword = (password) => {
	const salt = crypto.randomBytes(32).toString('hex');
	const genHash = crypto
		.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
		.toString('hex');
	return {
		salt,
		genHash,
	};
};

const validatePassword = (password, hash, salt) => {
	const genHash = crypto
		.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
		.toString('hex');
	return hash === genHash;
};

const issueJWT = (user) => {
	const { ID } = user;
	const expiresIn = '1d';

	const payload = {
		sub: ID,
		iat: Date.now(),
	};

	const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
		expiresIn,
		algorithm: 'RS256',
	});

	return {
		token: `Bearer ${signedToken}`,
		expiresIn,
	};
};

const validateToken = (token) => {
	return new Promise(async (resolve, reject) => {
		const tokenAccess = token.replace('Bearer ', '');
		jsonwebtoken.verify(
			tokenAccess,
			PRIV_KEY,
			{ algorithms: 'RS256' },
			(error, decoded) => {
				if (error) {
					resolve(null);
				} else {
					resolve(decoded.sub);
				}
			}
		);
	});
};

//middleware
const validateTokenMiddleware = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(403).send({ message: 'No token provided.' });
	}
	const token = req.headers.authorization.replace('Bearer ', '');
	jsonwebtoken.verify(
		token,
		PRIV_KEY,
		{ algorithms: 'RS256' },
		(err, decoded) => {
			if (err) {
				res.status(403).send({ message: 'Invalid or expired token.' });
			} else {
				req.userID = decoded.sub;
				next();
			}
		}
	);
};

module.exports = {
	genPassword,
	validatePassword,
	issueJWT,
	validateToken,
	validateTokenMiddleware,
};
