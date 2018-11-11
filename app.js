const express = require('express');
const path = require('path');
const art_express = require('express-art-template');//引入模版引擎

const userServise = require('./service/userService')

const app = express();//创建app对象

//设置art模版引擎,第一个参数是文件名后缀，需要和render方法第一个参数后缀一样
app.engine('html',art_express);
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});

//用express提供的中间件 请求静态文件
app.use(express.static(path.join(__dirname,'public')))
//动态的内容
app.get('/user',(req,res)=>{

    //render方法，第一个参数是模版的文件名(express框架默认会从根目录下面views目录下找文件)，第二个是模版的数据
    res.render('users/users.html',{
        title:'你好！',
        users:userServise.getUsers()
    })

    // res.send('访问路径/user/list');
    // res.end();
})



app.listen(59999,()=>{
    console.log("服务已开启，可以访问http:127.0.0.1:59999");
})