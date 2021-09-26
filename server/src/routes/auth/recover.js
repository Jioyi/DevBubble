const { Router } = require('express');
const router  = Router();

router.post('/',(req,res,next)=>{
    res.json({ message: 'Password recovered' })
});


module.exports = router;