const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
	res.json({ message: 'Welcome to Dev Bubble!' });
});


router.use('/auth',require('./auth'));
router.use('/group', require('./group'));
router.use('/images', require('./images'));
router.use('/avatars', require('./avatars'));
router.use('/user', require('./user'));
router.use('/channel', require('./channel'));
router.use('/directMessage', require('./directMessage'));
router.use('/emojis', require('./emojis'));

module.exports = router;

