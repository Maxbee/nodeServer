const express = require('express');
var router = express.Router()

var User  = require('../models/User')
var responseData
router.use((req,res,next)=>{
    responseData = {
        code:0,
        message:' '
    }

    next()
})

//注册
router.post('/user/register',(req,res,next)=>{
    let {username,password,repassword} = req.body
    if(!username||!password||!repassword){
        responseData.code = 1;
        responseData.message = '账号或密码不能为空！'
        res.json(responseData)
        return
    }
    if(password!=repassword){
        responseData.code = 1;
        responseData.message = '两次密码不一致'
        res.json(responseData)
        return
    }
    User.findOne({
        username
    }).then((userInfo)=>{
        if(userInfo){
            responseData.code = 1;
            responseData.message = '用户已存在'
            res.json(responseData)
        }else{
            var user = new User({username,password})
            user.save()
            .then(result=>{
                responseData.message = '注册成功'
                responseData.name = result.username
                res.json(responseData)
            })

            
        }   
        // res.json(responseData)
    })
    

})

//登录
router.post('/user/login',(req,res,next)=>{
    let {username, password} = req.body
    
    if(username==''||password==''){
        responseData.code = 1
        responseData.message = '用户名或密码为空'
        res.json(responseData)
        return
    }

    User.findOne({
        username,
        password
    }).then((info)=>{
        if(!info){
            responseData.code = 1;
            responseData.message = '用户名或密码错误';
            res,json(responseData)
            return
        }
        responseData.message = '登录成功'
        responseData.userInfo = {
            username:info.username,
            _id:info._id
        }
        req.cookies.set('userinfo',JSON.stringify({
            username:info.username,
            _id:info._id
        }))
        res.json(responseData)
        return
    })
})
module.exports = router