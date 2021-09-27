const { Router } = require('express');
const router = Router();
const { User, Group, Hidden } = require('./../../db');
const {
	validateTokenMiddleware,
	issueJWT,
} = require('./../../utils/passwordUtils');

router.get('/', validateTokenMiddleware, async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { ID: req.userID },
			attributes: ['ID', 'email', 'avatar', 'state', 'username'],
			include: [
				{
					model: Group,
					as: 'groups',
					attributes: ['ID', 'name', 'image', 'ownerID'],
					through: {
						attributes: [],
					},
				},
				{
					model: Hidden,
					as: 'hidden_list',
					attributes: ['ID', 'DirectMessageID'],
				},
			],
		});
		let hidden_list = [];
		user.hidden_list.forEach((item) => {
			hidden_list.push(item.DirectMessageID);
		});
		const { token, expiresIn } = issueJWT(user.toJSON());
		return res.status(200).json({
			success: true,
			user: user,
			groups: user.groups,
			hidden_list: hidden_list,
			token: token,
			expiresIn,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
