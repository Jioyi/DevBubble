const { Router } = require('express');
const router = Router();
const signup = require('./signup');
const signin = require('./signin');
const recover = require('./recover');
const refreshToken = require('./refreshToken');
const checkToken = require('./check_token')

router.use('/signup', signup);
router.use('/signin', signin);
router.use('/recover', recover);
router.use('/refresh_token', refreshToken);
router.use('/check_token', checkToken)

module.exports = router;
