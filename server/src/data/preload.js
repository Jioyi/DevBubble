const { User, Group } = require('../db.js');
const users = require('./users');
const groups = require('./groups');
const preload = async () => {
	const usersCreated = await User.bulkCreate(users);
	const groupsCreated = await Group.bulkCreate(groups);
	await groupsCreated[0].setOwner(usersCreated[0].ID);
	await usersCreated[0].addGroup(groupsCreated[0]);
	await usersCreated[0].addGroup(groupsCreated[1]);
	await usersCreated[1].addGroup(groupsCreated[0]);

	
	/*const test = await Group.findByPk(groupsCreated[0].ID, {
		include: [
			{
				model: User,
				as: 'users',
			},
		],
	});
	console.log(test.users[0].UserGroup);*/
};

module.exports = preload;
