const { Router } = require('express');
const router = Router();
const { checkToken } = require('../security');
const { User, Group } = require('../db.js');
const middlewareUploadFile = require('../utils/middlewareUploadFile');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

router.post('/', checkToken, middlewareUploadFile, async (req, res, next) => {
	try {
		const { name } = req.body;
		if (req.file === undefined) {
			return res
				.status(400)
				.send({ message: 'invalid image type!' });
		}
		if (!name || name === '') {
			return res
				.status(400)
				.send({ message: 'enter a name for the new server!' });
		}
		if (req.file.mimetype !== 'image/gif') {
			sharp(req.file.path)
				.resize(250)
				.toFile(
					`${__dirname}../../imagesUpload/resize/${req.file.filename}`,
					(error, info) => {
						if (error) {
							next(error);
						}
					}
				);
		}
		const groupCreated = await Group.create({
			ID: uuidv4(),
			name: name,
			image: req.file.filename,
		});
		await groupCreated.setOwner(req.user.ID);
		await groupCreated.addUser(req.user.ID);
		return res.json({
			message: 'successful',
			group: groupCreated,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
