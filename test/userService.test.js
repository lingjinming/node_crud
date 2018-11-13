const userService = require('../service/userService');
// const assert = require('assert');//
const should = require('should');//
//单元测试
//一个单元测试：定义一个创建，创建初始化数据，开始调用测试的单元代码执行，然后检查执行的结果是否是我们的预期，如果是。则通过
//最后清理测试数据

//1--定义场景  两个参数
describe('userServerice服务测试', function () {
    // //定义测试用例 测试getUsers方法是否达到我们的预期
    // it('#getUsers()', function () {
    //     //返回一个数组
    //     var arr = userService.getUsers();
    //     assert.equal(true,Array.isArray(arr));
    //     assert.equal(arr.length>0,true);
    // });
    //
    // it('#getPageUsers()', function () {
    //     console.log('111')
    // });

    it('should #getPageUsers()', function () {
        const data = userService.getPageUsers('222',333);
        // data.should.be.a.Object();//判断类型
        data.code.should.eql(2);

        userService.getPageUsers(2,'1111').should.eqls({
            code:0,
            msg:'size类型错误'
        })
        const edata = userService.getPageUsers(2,5)
        edata.should.be.a.Object()
        edata.code.should.eql(200);
        edata.users.length.should.eql(5)

    });



});

