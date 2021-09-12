const { Router } = require('express');
const router = Router();
const emojis = require('../data/emojis');

router.get('/', async (req, res, next) => {
	try {
		return res.status(200).json({
			message: 'successful',
			emojis: emojis,
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
