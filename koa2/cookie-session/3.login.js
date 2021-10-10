let Koa = require('koa');
let Router = require('koa-router');
let bodyparser = require('koa-bodyparser');
let views = require('koa-views');
let session = require('koa-session');
let app = new Koa();
let router = new Router();
app.keys = ['zf'];
app.use(
  session(
    {
      // 续命 访问淘宝 30分钟之内一直访问
      expires: new Date(Date.now() + 10000),
    },
    app
  )
);
app.use(
  views(__dirname + '/views', {
    map: {
      html: 'ejs',
    },
  })
);
router.get('/', async (ctx) => {
  await ctx.render('home.html');
});
router.post('/login', async (ctx) => {
  let { username, password } = ctx.request.body;
  if (username === '1' && password === '1') {
    // 表示用户登陆成功了 存到session
    ctx.session.user = { username };
    ctx.redirect('/list');
  } else {
    ctx.redirect('/');
  }
});
router.get('/list', async (ctx) => {
  // 如果当前访问的这个请求里 可以拿到session 就表示登陆过
  let username = ctx.session.user || {};
  console.log(ctx.session);
  if (username) {
    console.log(username);
    await ctx.render('list.html', { username });
  } else {
    ctx.redirect('/');
  }
});
app.use(bodyparser()); // 支持 json  表单 不支持文件上传 koa-multer
app.use(router.routes());
app.listen(3003);

// session 基于cookie 跨域

// 第一次客户端访问服务器（登陆）
// 服务器将要返回的内容 {username:xxxx} 并且在加一个签名返还给客户端

// 返还的结果是 内容+签名

// 你在次访问服务器 我同构签名校验一下内容，如果都没问题，我可以认为你有登陆的权限

// 服务器不需要存储用户的状态，并且可以无限扩展
