const { Router } = require('express');
const { validateTokenMiddleware } = require('./../utils/passwordUtils');
const Sequelize = require('sequelize');
const { User, SocialNetwork } = require('../db');
const router = Router();
const Op = Sequelize.Op;

router.put(
	'/change_state/:state',
	validateTokenMiddleware,
	async (req, res, next) => {
		try {
			const { state } = req.params;
			await User.update(
				{
					state: state,
				},
				{
					where: {
						ID: req.userID,
					},
				}
			);
			return res.status(200).json({
				message: 'successful',
			});
		} catch (error) {
			next(error);
		}
	}
);

router.get('/', async (req, res, next) => {
	try {
		const users = await User.findAll({
			attributes: ['ID', 'username', 'avatar'],
		});
		return res.status(200).json({
			message: 'successful',
			users: users,
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.get('/target/:userID', validateTokenMiddleware, async (req, res, next) => {
	try {
		const { userID } = req.params;
		const user = await User.findOne({
			where: { ID: userID },
			attributes: ['ID', 'connected', 'state', 'username', 'avatar'],
			include: [
				{
					model: SocialNetwork,
					as: 'social_networks',
					attributes: ['ID', 'link'],
				},
			],
		});
		if (user) {
			return res.json({
				message: 'successful',
				user: user,
			});
		}
		return res.json({
			message: 'bad request',
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
});

module.exports = router;
