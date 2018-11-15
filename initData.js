//初始化默认测试用户数据
const fs = require('fs');
const path = require('path');
const jsondb = require('./db');
const Mock = require('mockjs');

// jsondb.user || (jsondb.user = []);

/*for (var i=0 ;i<30;i++) {
    jsondb.users.push({
        id:10000 + i,
        name:'jm' + i,
        phone:18709863960 + i,
        email:1241790664 + i +'@qq.com',
    })
}*/

let data = Mock.mock({
    'users|40':[{
        'id|+1':10000,
        'name':'@cname',
        'email':'@email',
        'phone':'@natural(13955107789,18709863960)',
        'address':'@country(true)',
        'birthday':'@yyyy-MM-dd',
        'zip':'@zip',
    }]
})
//es6中的展开运算符
// jsondb.users.push(...data.users)
jsondb.users = data.users;
//把数据写入db.json
fs.writeFileSync(path.join(__dirname,'db.json'),JSON.stringify(jsondb),{
    encoding:'utf8'
})
console.log('写入数据完成')