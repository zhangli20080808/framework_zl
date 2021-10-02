/**
 * 1. listen
 * 2. use
 * 3. ctx 上下文对象
 * 4. 错误监控
 * 
 * 原理主要就是compose方法，把多个promise方法组合成了一个promise方法，主要依赖递归的方式
 * 先取出第一个执行，第一个会等待第二个promise执行完成
 *
 * 目录
 * application 应用文件，默认引用的
 * req/res node中默认的req,res
 * response,request koa自己封装的
   ctx 包含了原生的请求和响应 req,res，也包含了自己封装的请求和响应 request,response
 * content 上下文对象 整合 req\res\request\response
 */

// const Koa = require('koa');
const Koa = require('./lib/application');
const static = require('koa-static')
const path = require('path')
const app = new Koa();

// console.log(__dirname);
// console.log(path.resolve(__dirname,'public'));
// console.log(path.join(__dirname, '../node_modules')); // /Users/zhangli/framework_zl/node_modules
app.use(static(__dirname));
app.use(static(path.join(__dirname, '../node_modules'))); // http://localhost:3003/co/history.md

app.use((ctx) => {
  // console.log(ctx.req.path); // 原生的url
  // console.log(ctx.request.url); // 自己封装的url属性
  // console.log(ctx.request.req.url); // 自己封装的 request 有原生的 req属性
  // console.log(ctx.url); // 表示是 ctx.request.url - 目的更短

  // console.log(ctx.path); // 这个path可以认为是我们 之前获取的  pathname
  // ctx.body = '123'; // 等价于 ctx.response.body
  ctx.response.body = '12';
  console.log(ctx.body, ctx.response.body);
});
// 原理描述
/**
 * 1. req和request的区别  request.req = req
 * 2. ctx.path === ctx.request.path的原因  // 从ctx上取值的时候，他会从request中去取，内部做了代理  defineProperty
 * 比如 ctx.path 找的时候，自身没有，沿着__proto__去找，找到了context对象，{} 在他身上取值的时候，回去执行另一个方法
 */

app.listen(3002, () => {
  console.log(`服务启动在${3002}`);
});
