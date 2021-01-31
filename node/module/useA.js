/**
 * node中可以使用同步的方式读取文件
 * 一调用 require 会把当前用户写的代码包装到一个函数中
 */

const result = require('./a');
console.log(result);

/**
 * 通过读取文件内容 将内容包装自执行函数中 默认返回 module.exports 作为函数的结果
 * 会转义成下方代码
 let result = function (exports, module, __filename, __dirname) {
  module.exports = 'zhangLi'
  return module.exports
}(exports, module, __filename, __dirname)
 */

 /**
  * 
  * @param {*} 
  * 1. node --inspect-brk 
  * chrome://inspect
  */

function sun(a) {
  return function (b) {
    return a + b;
  };
}
let fn = sun(2);
fn(10);
