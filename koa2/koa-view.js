/**
 * 模板引擎 koa-views
 * jade ejs nunjucks
 */

const Koa = require('koa');
const app = new Koa();
const views = require('./koa-views');
const path = require('path');

app.use(
  views(path.join(__dirname, '/views'), {
    map: {
      html: 'ejs',
    },
  })
);
app.use(async (ctx) => {
  return ctx.render('index', { name: 'zl1', arr: [4, 5, 6] });
});

app.listen(3002);
