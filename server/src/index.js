require('dotenv').config();
const preload = require('./data/preload.js');
const http = require('./http.js');
const { conn } = require('./db.js');

const port = process.env.SERVER_PORT || 3001;

conn
	.sync({ force: true })
	.then(() => {
		http.listen(port, async () => {
			await preload();
			console.log(`Server listening on port: ${port}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
