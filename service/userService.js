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

}