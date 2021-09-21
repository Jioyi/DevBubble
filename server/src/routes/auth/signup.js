const { Router } = require('express');
const router = Router();

const { User } = require('../../db');
const genPassword = require('./passwordUtils').genPassword;
const { v4: uuidv4 } = require('uuid')

router.post('/', async (req,res,next)=>{
    const { email, username, password } = req.body;

    const { genHash, salt } = genPassword(password);

    const ID = uuidv4();
    
    try {
        const user = await User.create({
            ID,
            email,
            hashed_password: genHash,
            salt,
            username
        });
        
        res.json(user);

    } catch(err) {
        next(err);
    }
    

});

module.exports = router;