var express =require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var swig =require('swig')
var Cookies = require('cookies')
var app = express()

const admin = require('./routers/admin')
const api = require('./routers/api')
const main = require('./routers/main')
const User = require('./models/User')
//设置静态文件托管
app.use('/public',express.static(__dirname+'/public'))

app.engine('html',swig.renderFile)
//设置模版文件存放的目录，第一个参数必须为views，第二参数是文件夹目录
app.set('views','./views')

app.set('view engine','html')
//取消模版缓存
swig.setDefaults({cache:false})
//解析数据
app.use(bodyParser.urlencoded({ extended: false }))

//设置cookie
app.use((req,res,next)=>{
    req.cookies = new Cookies(req,res);
    req.userInfo = {}
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get(userInfo))
            User.findById(req.userInfo._id).then((info)=>{
                req.userInfo.isAdmin = Boolean(info.isAdmin) 
            })
        }catch(e){

        }
    }
    next()
})
app.use('/admin',admin)
app.use('/api',api)
app.use('/',main)

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
 
    console.log('数据库连接成功')

});

app.listen(8088)