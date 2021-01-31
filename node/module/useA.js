/**
 * node中可以使用同步的方式读取文件
 * 一调用 require 会把当前用户写的代码包装到一个函数中
 */

const result = require('./a');
console.log(result);


/**
 * 运行步骤
 * 1. Module._load 加载模块
 * 2. Module._resolveFilename 把相对路径转化成绝对路径
 * 3. let module = new Module 创建一个模块 模块的信息 id exports
 * 4. 尝试加载这个模块
 * 5. 通过不同的后缀进行加载 json/js
 * 6. Module._extensions 文件的处理方式
 * 7. 核心就是读取文件
 * 8. 给文件外层增加一个函数 并且让函数执行 改变了this，传入了  exports, require, module,filename, dirname属性
   9. 用户会给  module.exports 赋值                            
 * 10.最终返回  module.exports 拿到最终结果

 简单理解-> 把文件读出来 包个函数 执行 传入对象 用户填值 填完返回
 * 
 */

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

// function sun(a) {
//   return function (b) {
//     return a + b;
//   };
// }
// let fn = sun(2);
// fn(10);
