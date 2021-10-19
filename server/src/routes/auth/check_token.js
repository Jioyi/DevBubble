const { Router } = require('express');
const router = Router();
const { User } = require('./../../db');
const {
	validateTokenMiddleware,
	issueJWT,
} = require('./../../utils/passwordUtils');

router.get('/', validateTokenMiddleware, async (req,res,next)=>{
    const ID = req.userID
    try {
        const user = await User.findOne({ 
            where: { ID },
            attributes: [
                'ID',
                'avatar',
                'email',
                'state',
                'username'
            ] 
        });
        res.json({
            success: true,
            user
        })
    } catch(err) { next(err) }

});

module.exports = router;