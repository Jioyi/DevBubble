const { Router } = require('express');
const router = Router();
const { checkToken } = require('../security');
const { User, Group } = require('../db.js');
const middlewareUploadFile = require('../utils/middlewareUploadFile');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const fs = require('fs');

router.post('/', checkToken, middlewareUploadFile, async (req, res, next) => {
	try {
		const { name } = req.body;
		const { filename: image } = req.file;
		if (!name) {
			return res
				.status(400)
				.send({ message: 'Please, enter a name for the new server!' });
		}
		if (req.file == undefined) {
			return res
				.status(400)
				.send({ message: 'Please, image missing for server!' });
		}
		console.log(req.file);
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
			image: image,
		});
		const user = await User.findOne({
			//borrar cuando cambie lo de abajo
			where: { email: req.user.email },
		});
		await groupCreated.setOwner(user.ID); //req.user.ID
		return res.json({
			message: 'successful',
			server: groupCreated,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
