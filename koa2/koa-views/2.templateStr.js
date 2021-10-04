/**
 * 如何实现模板引擎
 * 1. 读取到文件
 * 2. 正则替换
 * 对于模板 1. 去掉<%%>,还是个字符串 2. 在读取到的字符串基础上，再分段拼接起来 3. 构建函数传参，理论传递data，
 * 使用的是data中的数据，所以我们 使用with语法，保证作用域
 */

let fs = require('fs');
let path = require('path');
let ejs = require('ejs');

let str = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

function render(template, data) {
  // 空格非空格 \s\S 多个 + 尽可能少找 ?
  template = template.replace(/<%=([\s\S]+?)%>/g, function () {
    return data[arguments[1]];
  });
  return template;
}

let r = ejs.render(str, { name: 'zl', age: 18, arr: [1, 2, 3] });
console.log(r);
