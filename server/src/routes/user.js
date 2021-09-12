const { Router } = require('express');
const { checkToken } = require('../security');
const Sequelize = require('sequelize');
const { User } = require('../db');
const router = Router();
const Op = Sequelize.Op;

router.put('/change_state/:state', checkToken, async (req, res, next) => {
	try {
		const { state } = req.params;
		await User.update(
			{
				state: state,
			},
			{
				where: {
					ID: req.user.ID,
				},
			}
		);
		return res.status(200).json({
			message: 'successful',
		});
	} catch (error) {
		next(error);
	}
});

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

module.exports = router;
