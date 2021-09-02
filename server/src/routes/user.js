const { Router } = require('express');
const { checkToken } = require('../security');
const { User } = require('../db');
const router = Router();

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

module.exports = router;
