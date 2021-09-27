const path = require('path');
const fs = require('fs');

const createDirectory = (pathname) => {
	const __dirname = path.resolve();
	pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
	fs.mkdir(path.resolve(__dirname, pathname), { recursive: true }, (e) => {
		if (e) {
			console.error(e);
		} else {
			console.log(`directory created successfully: ${pathname}`);
		}
	});
};

module.exports = createDirectory;
