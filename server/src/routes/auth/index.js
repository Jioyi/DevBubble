const { Router } = require('express');
const router  = Router();
const signup  = require('./signup');
const signin  = require('./signin');
const recover = require('./recover')

router.use('/signup',signup);
router.use('/signin',signin);
router.use('/recover',recover);

module.exports = router;

