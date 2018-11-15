/*
* 对用户数据的服务封装
* */
const path = require('path')
const fs = require('fs')
const dbjson = require('../db')
// 获取用户信息
exports.getUsers = function () {
    return dbjson.users
}

// 分页 page是第几页，size是一页多少条
exports.getPageUsers = function (page,size) {
    if (typeof (page) !== 'number' || page<=0){
        return{
            code:0,
            msg:'page类型错误'
        }
    }
    if (typeof (size) !== 'number' || size<=0){
        return{
            code:0,
            msg:'size类型错误'
        }
    }

    return {
        users:dbjson.users.slice((page - 1)*size,page*size),
        count:dbjson.users.length,
        code:200,
        msg:'请求分页成功'
    }
}

//把数据保存到db.json文件中
exports.adduser = function (user) {
    //先判断user对象是否合法
    if(!user.name){
        return{
            code:1,
            msg:'用户名不能为空'
        }
    }
    // 自动赋值ID
    const newUser= Object.assign({id:Date.now()},user)//assign 返回一个新的对象
    dbjson.users.push(newUser)
    _saveJson(dbjson)
    return{
        code:200,
        msg:'保存成功'
    }
}

//删除用户
exports.delUser =function (id) {
    if (id>0&&typeof (id)==="number"){
       const index = dbjson.users.findIndex(u=>u.id == id)
        dbjson.users.splice(index,1)
        _saveJson(dbjson)
        return{
            code:200,
            msg:'删除成功'
        }
    }
    return{
        code:0,
        msg:'删除失败'
    }
}
//修改用户
exports.getUserById = function (id) {
    if (typeof (id)==='number'&&id>0){
        return dbjson.users.find(u=>u.id == id)//注意双等号
    }else {
        return null
    }
}
exports.editUser =function (user) {
    if (user&&user.id>0&&typeof (user.id)==="number"){
        //找到要修改的哪个索引
        console.log('要修改的是'+JSON.stringify(user))
        const editIndex = dbjson.users.findIndex(u=>u.id == user.id)

        console.log('editIndex'+editIndex)

        dbjson.users.splice(editIndex,1,user)//删除editIndex这个数据，再用user这个数据替换
        _saveJson(dbjson)
        return{
            code:200,
            msg:'修改成功'
        }
    }
    return{
        code:0,
        msg:'获取失败'
    }
}

//把对象保存为json
function _saveJson(jsondata) {
    const str = JSON.stringify(jsondata)
    fs.writeFileSync(path.join(__dirname,'../db.json'),str,{
        encoding:'utf8'
    })
}