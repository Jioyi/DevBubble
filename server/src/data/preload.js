const { User } = require('../db.js');
const users = require('./users');
const preload = async () => {
	const usersCreated = await User.bulkCreate(users);
};

module.exports = preload;