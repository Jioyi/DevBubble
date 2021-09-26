const { Router } = require('express');
const router  = Router();

const { User } = require('../../db');
const { validatePassword, issueJWT } = require('./passwordUtils');

router.post('/', (req,res,next)=>{
    const { email, password } = req.body;

    User.findOne({ where: { email } })
        .then((user)=>{
            if (!user) return res.sendStatus(401);
        
            const validation = validatePassword(password, user.hashed_password, user.salt);
            if (!validation) return res.sendStatus(401);
        
            const { token, expiresIn } = issueJWT(user);
            res.json({
                success: true,
                user,
                token,
                expiresIn
            });
        })
        .catch((err)=>{
            next(err)
        });    
});

module.exports = router;