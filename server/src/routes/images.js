const { Router } = require('express');
const router = Router();
const fs = require('fs');

router.get('/:image', async (req, res, next) => {
	try {
		const { image } = req.params;
		fs.readFile(__dirname + '../../imagesUpload/' + image, (err, content) => {
			if (err) {
				res.writeHead(400, { 'Content-type': 'text/html' });
				res.end('No such image!');
			} else {
				const extension = image
					.substring(image.lastIndexOf('.') + 1)
					.toLowerCase();
				res.writeHead(200, { 'Content-type': `image/${extension}` });
				res.end(content);
			}
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
