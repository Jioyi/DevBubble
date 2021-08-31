const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
	res.json({ message: 'Welcome to Dev Bubble!' });
});

router.use('/auth', require('./auth'));

module.exports = router;