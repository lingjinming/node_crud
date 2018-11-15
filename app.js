const express = require('express');
const path = require('path');
const art_express = require('express-art-template');//引入模版引擎
const bodyParser = require('body-parser');//引入
// const multer = require('multer');//

const userServise = require('./service/userService')

const app = express();//创建app对象
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//设置art模版引擎,第一个参数是文件名后缀，需要和render方法第一个参数后缀一样
app.engine('html',art_express);
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});

//用express提供的中间件 请求静态文件
app.use(express.static(path.join(__dirname,'public')))

//动态的内容
app.get('/users',(req,res)=>{

    //render方法，第一个参数是模版的文件名(express框架默认会从根目录下面views目录下找文件)，第二个是模版的数据
    // res.render('users/users.html',{
    //     title:'你好！',
    //     users:userServise.getUsers()
    // })
    //分页
    const page = parseInt(req.query.page) ||1; //默认值
    const size = parseInt(req.query.size) ||10;
    const data = userServise.getPageUsers(page,size);
    data.currentPage = req.query.page;
    res.render('users/users.html',data)

    // res.send('访问路径/user/list');
    // res.end();
})
// 用户添加页面
app.get('/users/add',(req,res)=>{
    // //分页
    // const page = parseInt(req.query.page) ||1; //默认值
    // const size = parseInt(req.query.size) ||10;
    // const data = userServise.getPageUsers(page,size)
    res.render('users/add.html')
})
// 用户添加用户方法
app.post('/users/adduser',(req,res)=>{
     //res.send('ok')
    //res.query 可获取请求地址中的参数
    //res.param 可获取请求地址中的参数
    //res.body 可获取表单的参数
    console.log('start--------body')
    console.log(req.body)
    console.log('end----------body')
    userServise.adduser(req.body)

    res.redirect('/users')
})
//删除用户
app.get('/users/del',(req,res)=>{
    userServise.delUser(parseInt(req.query.id))
    res.redirect('/users')
})
//修改用户页面
app.get('/users/edit',(req,res)=>{
    // userServise.editUser(parseInt(req.query.id))
    const user = userServise.getUserById(parseInt(req.query.id))
    console.log('要修改的id是'+req.query.id)
    if (user ==null){
        res.redirect('/users')
    }
    res.render('users/edit.html',user)
})
//修改
app.post('/users/edituser',(req,res)=>{

    let user = Object.assign({},req.body,{id:parseInt(req.body.id)})

    // console.log('要修改的事实上'+user)
    const data = userServise.editUser(user)
    if (data.code == 200){
        res.redirect('/users')
        return;
    } else {
        //修改失败则继续修改
        res.render('users/edit.html',req.body)
    }
})
app.listen(59999,()=>{
    console.log("服务已开启，可以访问http:127.0.0.1:59999");
})