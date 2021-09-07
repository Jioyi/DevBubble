const { v4: uuidv4 } = require('uuid');
const Bcrypt = require('bcrypt');
const users = [
	{
		ID: '5aabf741-481b-498e-ae96-62a643a38d82',
		username: "carlos198",
		email: 'karlosagreda@hotmail.com',
		password: Bcrypt.hashSync('123456', 10),
	},
	{
		ID: uuidv4(),
		username: "karlos198",
		email: 'karlosagreda2@hotmail.com',
		password: Bcrypt.hashSync('123456', 10),
	},
];

module.exports = users;
