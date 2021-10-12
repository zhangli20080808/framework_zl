/**
 * after 类比 lodash 的 after
 * 比如 我们希望我调用某个函数三次之后再去执行
 * 解决异步并发问题(比如同时去读取文件，完成的时间不确定) 比如同时发送多个请求，拿到所有结果之后再去渲染页面
 * 并发操作 - 两个操作互不影响
 * 核心主要依赖计数器去实现 完成--  等这些个请求完成了 执行操作
 */
const fs = require('fs');

function after(times, callback) {
  let school = {};
  return function out(key, value) {
    school[key] = value;
    if (--times === 0) {
      callback(school);
    }
  };
}

let out = after(2, (school) => {
  console.log(school, 'school'); // { age: '13', name: 'zl' } school
});
fs.readFile('./name.txt', 'utf-8', function (err, data) {
  // console.log(data)
  out('name', data);
});
fs.readFile('./age.txt', 'utf-8', function (err, data) {
  // console.log(data)
  out('age', data);
});
//上面的after只能接受一个回调 修改 接受多个  - 发布订阅
