let Router = require('koa-router');
let work = new Router();
work.post('/add', (ctx, next) => {
  ctx.body = 'work add';
});
work.put('/add', (ctx) => {
  ctx.body = 'work add';
});
work.get('/add', (ctx) => {
  ctx.body = 'work add';
});
module.exports = work;
