const { v4: uuidv4 } = require('uuid');
const messages = [
	{
		ID: '5aabf741-481b-498e-ae96-12a293a38d17',
		content:
			'@@@__5aabf741-481b-498e-ae96-62a643a12d82^^^__karlos198@@@^^^ 😂 ',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a38d82',
		createdAt: "2021-09-13T19:03:01.396Z"
	},
	{
		ID: '5aabf741-481b-498e-ae96-12a646a37d28',
		content:
			'@@@__5aabf741-481b-498e-ae96-62a643a12d82^^^__karlos198@@@^^^ 😂 ',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-13T19:03:02.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 1',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-13T19:03:03.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 2',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-13T19:03:04.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 3',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-13T19:03:05.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 4',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-13T19:03:10.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 5',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-13T19:04:10.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 6',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-14T19:04:10.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 7',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-14T19:04:12.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 8',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-14T19:04:15.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 9',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-14T19:04:18.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 10',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-14T19:04:20.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 11',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-14T19:04:21.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 12',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:21.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 13',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:22.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 14',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:23.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 15',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:24.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 16',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:25.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 17',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:30.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 18',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:32.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 19',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:35.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 20',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:36.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 21',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:37.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 22',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:38.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 23',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:39.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 24',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:40.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 25',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:41.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 26',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:42.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 27',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:43.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 28',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:44.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 29',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:45.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 30',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:50.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 31',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:04:55.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 32',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:05:00.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 33',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:05:01.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 34',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:05:02.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 35',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:05:03.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 36',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:05:04.396Z"
	},
	{
		ID: uuidv4(),
		content: 'test 37',
		DirectMessageID: '5aabf741-481b-498e-ae96-12a643a38d27',
		UserID: '5aabf741-481b-498e-ae96-62a643a12d82',
		createdAt: "2021-09-15T19:05:05.396Z"
	},
];

module.exports = messages;
