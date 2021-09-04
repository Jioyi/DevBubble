const { v4: uuidv4 } = require('uuid');
const channels = [
	{
		ID: '5aabf741-481b-498e-ae96-12a643a38d22',
		name: 'General',
		type: 'text',
	},
	{
		ID: '5aabf741-481b-498e-ae96-622222a38d12',
		name: 'Chat Leaders',
		type: 'text',
	},
	{
		ID: '5aabf741-481b-498e-ae96-622222a38d13',
		name: 'Sala',
		type: 'voice',
	},
	{
		ID: '5aabf741-481b-498e-ae96-12a643a32d22',
		name: 'Sala privada',
		type: 'voice',
	},
];

module.exports = channels;
