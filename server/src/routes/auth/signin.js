const { Router } = require('express');
const router  = Router();

const { User } = require('../../db');
const validatePassword = require('./passwordUtils');

router.post('/',(req,res,next)=>{
    
});

module.exports = router;