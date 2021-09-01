const { Router } = require('express');
const router = Router();
const { checkToken } = require('../security');
const { User, Group } = require('../db.js');
const uploadFile = require('../utils/uploadFile');
const { v4: uuidv4 } = require('uuid');

router.post('/', checkToken, async (req, res, next) => {
	try {
		await uploadFile(req, res);
		const { name } = req.body;
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
		const groupCreated = await Group.create({
			ID: uuidv4(),
			name: name,
			image: req.file.filename,
		});
		const user = await User.findOne({//borrar cuando cambie lo de abajo
			where: { email: req.user.email },
		});
		await groupCreated.setOwner(user.ID);//req.user.ID
		return res.json({
			message: 'successful',
			server: groupCreated,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
