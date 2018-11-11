const express = require('express');
const path = require('path');

const app = express();//创建app对象
//用express提供的中间件 请求静态文件
app.use(express.static(path.join(__dirname,'public')))
//动态的内容
app.get('/user/list',(req,res)=>{
    res.send('访问路径/user/list');
    res.end();
})



app.listen(59999,()=>{
    console.log("服务已开启，可以访问http:127.0.0.1:59999");
})