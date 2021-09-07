const { Router } = require('express');
const router = Router();
const { checkToken } = require('../security');
const { User, DirectMessage } = require('../db.js');

router.get('/', checkToken, async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { ID: req.user.ID },
			attributes: ['ID'],
			include: [
				{
					model: DirectMessage,
					as: 'direct_messages',
					attributes: ['ID'],
					through: { attributes: [] },
					include: [
						{
							model: User,
							as: 'users',
							attributes: ['ID', 'connected', 'state', 'username', 'avatar'],
							through: { attributes: [] },
						},
					],
				},
			],
		});
		return res.json({
			message: 'successful',
			direct_messages: user.direct_messages,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
