const { Router } = require('express');
const router = Router();
const passport = require('passport')

router.get('/', (req, res) => {
	res.json({ message: 'Welcome to Dev Bubble!' });
});

router.use('/auth',require('./auth'));
router.use('/channel', require('./channel'));

router.use('/images', require('./images'));
router.use('/avatars', require('./avatars'));

//router.use(passport.authenticate('jwt', { session: false }))

router.use('/group', require('./group'));
router.use('/user', require('./user'));

router.use('/directMessage', require('./directMessage'));
router.use('/emojis', require('./emojis'));

module.exports = router;

