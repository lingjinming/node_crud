/*
* 对用户数据的服务封装
* */
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
        code:200,
        msg:'请求分页成功'
    }
}