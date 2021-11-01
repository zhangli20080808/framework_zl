let Koa = require("koa");
const static = require('koa-static');
const path = require('path');

let app = new Koa();


// let bodyParser = require("koa-bodyparser"); // bodyParser 执行后是一个函数 中间件函数
// 中间有什么特点
// 1).在中间件函数中 处理封装公共的属性和逻辑 添加方法和属性 ctx.request.body
// 2).决定是否向下执行，不掉用当前操作就结束了(权限校验，有权限继续向下，没有，直接返回) 也就是 提前处理请求，给koa 提前处理静态资源
// 3).封装公共逻辑
// 前端提交信息 服务端要接收
// app.use(bodyParser());

function bodyParser() { // 中间件是函数的原因是因为 函数可以传参
  return async (ctx, next) => {
    ctx.request.body = await new Promise((resolve, reject) => {
      let arr = [];
      ctx.req.on("data", function(data) {
        arr.push(data);
      });
      ctx.req.on("end", function(data) {
        console.log(Buffer.concat(arr).toString());
        resolve(Buffer.concat(arr).toString());
      });
    });
    await next();
  };
}
app.use(bodyParser());
app.use(async (ctx, next) => {
  if (ctx.path == "/" && ctx.method == "GET") {
    ctx.body = `
            <form action="/form" method="post">
                <input type="text" name="username">
                <button type="submit">提交</button>            
            </form>
        `;
  } else {
    await next();
  }
});

// 所有的异步方法全部改写成promise，否则就不会有等待异步完成效果
app.use(async (ctx, next) => {
  if (ctx.path == "/form" && ctx.method == "POST") {
    // 如何获取 当前提交过来的数据
    ctx.body = ctx.request.body;
  }
});
app.listen(3003);

// function bodyParser(ctx){
//     return new Promise((resolve,reject)=>{
//         let arr = [];
//         ctx.req.on("data", function(data) {
//           arr.push(data);
//         });
//         ctx.req.on("end", function(data) {
//           resolve(Buffer.concat(arr).toString());
//         });
//     })
// }
