/*
 * 高阶函数 两个特点满足其中一个即可
 * 1.如果一个函数的参数中有函数，那么当前这个函数就是高阶函数(回调)
 * 2.如果一个函数返回了一个函数，那么当前这个函数就是高阶函数
 *
 * 通过函数取学习我们的设计模式 promise
 * 参数值是函数  返回值是函数 满足一个即可
 * */

//核心业务代码
function say(a, b, c, d) {
  console.log('说话', a, b, c, d);
}

//拓展方法
//当前实例都可以调用所属类原型上的方法
//this指向  谁调用this就指向谁 拓展运算符  实现after函数

Function.prototype.before = function (callback) {
  //this -> say
  //箭头函数的特点 没有this  没有arguments 没有prototype 不能new
  //剩余运算符 可以把所有参数组成一个数组列表
  return (...args) => {
    // console.log(args) [1,2,3,4]
    callback();
    this(...args); //apply 将参数展开一次传入
  };
};
let newSay = say.before(() => {
  console.log('说话前');
});
newSay(1, 2, 3, 4);

// react中的事务 