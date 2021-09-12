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
		ID: '5aabf741-481b-498e-ae96-62a643a12d82',
		username: "karlos198",
		email: 'karlosagreda2@hotmail.com',
		password: Bcrypt.hashSync('123456', 10),
	},
	{
		ID: '5aabf741-481b-498e-ae96-22a643a12d82',
		username: "esteban",
		email: 'karlosagreda3@hotmail.com',
		password: Bcrypt.hashSync('123456', 10),
	},
	{
		ID: '5aabf741-481b-498e-ae96-15a643a12d82',
		username: "carmarom",
		email: 'karlosagreda4@hotmail.com',
		password: Bcrypt.hashSync('123456', 10),
	},
	{
		ID: '5aabf741-481b-498e-ae96-62a646a11d82',
		username: "camarada",
		email: 'karlosagreda5@hotmail.com',
		password: Bcrypt.hashSync('123456', 10),
	},
];

module.exports = users;
