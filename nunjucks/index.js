/**
 * 官方文档
 * https://nunjucks.bootcss.com/getting-started.html
 */
// 首先设置配置项(如 autoescaping)，然后渲染一个字符串

let nunjucks = require('nunjucks');
nunjucks.configure({ autoescape: true });
// 第一种用法，渲染字符串
// let result = nunjucks.renderString('Hello {{ username }}', {
//   username: 'James',
// });

// views 模板存放文件夹
nunjucks.configure('views', { autoescape: true });
// render 渲染文件 第一个参数是相对于 views 的目录
let result = nunjucks.render('index.html', { username: 'zl' });

console.log(result);
