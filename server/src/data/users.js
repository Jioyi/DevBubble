const { v4: uuidv4 } = require('uuid');
const Bcrypt = require('bcrypt');
const users = [
	{
		ID: uuidv4(),
		email: 'karlosagreda@hotmail.com',
		password: Bcrypt.hashSync("123456", 10),
	},
];

module.exports = users;
