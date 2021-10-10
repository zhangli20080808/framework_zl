// 记录用户访问网站的次数
// cookie + 1
// koa 内置了cookie  res.set   get
let Koa = require('koa');
let Router = require('koa-router');
let app = new Koa();
let router = new Router();
let crypto = require('crypto');
// 当用户访问 /visit 的时候 
// 加盐 签名
// oQbN7YS9zq8RRkN5-_2hAGtoHR4  上次写的 用.分割的方式 是express express 签名  sha256
// oQbN7YS9zq8RRkN5-_2hAGtoHR4
// koa sha1
// base64 在传输的是 + - / 都有特殊的含义所以内部需要替换一下
let r = crypto.createHmac('sha1','zf').update('visit=1').digest('base64');
app.keys = ['zf']
router.get('/visit',async ctx=>{
    let visit = ctx.cookies.get('visit',{signed:true});
    if(visit){
       visit += 1;
       ctx.body = '欢迎第'+visit+'次访问';
    }else{
        visit = 1;
        ctx.body = '欢迎第一次访问';
    }
    ctx.cookies.set('visit',visit,{signed:true});
});
app.use(router.routes());
app.listen(3000);
