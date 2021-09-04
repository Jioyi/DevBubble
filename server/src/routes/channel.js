const { Router } = require('express');
const router = Router();
const { checkToken } = require('../security');
const { Channel, Group } = require('../db.js');

router.get('/:groupID', checkToken, async (req, res, next) => {
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
