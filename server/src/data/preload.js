const { User, Group } = require('../db.js');
const users = require('./users');
const groups = require('./groups');
const preload = async () => {
	const usersCreated = await User.bulkCreate(users);
	const groupsCreated = await Group.bulkCreate(groups);
	await groupsCreated[0].setOwner(usersCreated[0].ID);
	
};

module.exports = preload;
