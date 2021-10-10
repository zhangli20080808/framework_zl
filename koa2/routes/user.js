let Router = require('koa-router');
let user = new Router({
    // prefix: '/user',
});

// prefix 做前缀来用,外面没有传递，如果需要二级，那就里面补充
user.post('/add', (ctx) => {
  ctx.body = 'user add';
});
user.get('/add', (ctx) => {
  ctx.body = 'user add';
});

module.exports = user;
