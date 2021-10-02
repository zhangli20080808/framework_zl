/**
 * 我们执行 koa 时，每个next 方法前面都需要增加 await方法 不然不会有等待效果
 * koa 为了统一错误处理 就将每个函数都转化成 promise，为了方便错误处理
 */
// const Koa = require('koa');
const Koa = require('./lib/application');

const app = new Koa();

const fs = require('fs');
const file = fs.createReadStream('./server.js');

const sleep = () => {
  return new Promise((resolve, reject) => {
    console.log('睡觉');
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(2);
});

app.use(async (ctx, next) => {
  console.log(3);
  await sleep();
  await next();
  console.log(4);
});

app.use(async (ctx, next) => {
  console.log(5);
  next();
  console.log(6);
  // ctx.body = file;
  ctx.body = {
    a: 1,
  };
});

app.on('error', (err) => {
  console.log(err, 'err');
});

app.listen(3003);
