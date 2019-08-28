const express = require('express');
var router = express.Router()


router.use((req,res,next)=>{
    console.log(req.userInfo.isAdmin)
    if(!req.userInfo.isAdmin){
        //不是管理员
        res.send('You are not admin')
    }

    next()
})
module.exports = router