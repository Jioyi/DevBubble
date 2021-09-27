const { Router } = require('express');
const router = Router();
const signup = require('./signup');
const signin = require('./signin');
const recover = require('./recover');
const refreshToken = require('./refreshToken');

router.use('/signup', signup);
router.use('/signin', signin);
router.use('/recover', recover);
router.use('/refresh_token', refreshToken);

module.exports = router;
