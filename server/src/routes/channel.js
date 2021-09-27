const { Router } = require('express');
const router = Router();
const { Channel } = require('../db.js');
const { validateTokenMiddleware } = require('./../utils/passwordUtils');

router.get('/:groupID', validateTokenMiddleware, async (req, res, next) => {
	try {
		const { groupID } = req.params;
		const channels = await Channel.findAll({
			where: {
				GroupID: groupID,
			},
		});
		return res.json({
			message: 'successful',
			channels: channels,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
