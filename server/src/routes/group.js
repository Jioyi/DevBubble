const { Router } = require('express');
const router = Router();
const { Group } = require('../db.js');
const middlewareUploadFile = require('../utils/middlewareUploadFile');
const { validateTokenMiddleware } = require('./../utils/passwordUtils');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const path = require('path');

router.post(
	'/',
	validateTokenMiddleware,
	middlewareUploadFile,
	async (req, res, next) => {
		try {
			const { name } = req.body;
			if (req.file === undefined) {
				return res.status(400).send({ message: 'invalid image type!' });
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
						path.join(
							__dirname,
							`/../imagesUpload/resize/${req.file.filename}`
						),
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
			await groupCreated.setOwner(req.userID);
			await groupCreated.addUser(req.userID);
			return res.json({
				message: 'successful',
				group: groupCreated,
			});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
