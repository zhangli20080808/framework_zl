/**
 * session 保证我们的cookie更加安全
   就是一个对象，保存着每次客户请求过来的信息
   借助于cookie，没有大小限制，存储于服务器中，持久化存储
   主要用于 前后端不分离，服务端渲染
 */
let http = require('http');
let querystring = require('querystring');
let uuid = require('uuid');
// 我去洗澡店消费
let session = {}; // 更安全的 可以存储用户的状态, 存在问题，服务器重启之后会信息会丢失,可以存储到redis里面
// 怎么证明是第一次来
// 我先给店铺起个名，然后发卡
let shopName = 'zl';
// 用户的信息 用户的名 做一个关联
http
  .createServer((req, res) => {
    // 可能有卡号 但是店铺黄了
    if (req.url === '/') {
      //  看用户是否有卡，卡号是否注册过
      let cardId = querystring.parse(req.headers.cookie, '; ')[shopName];
      if (cardId && session[cardId]) {
        // 第二次来
        session[cardId].mny -= 10;
        res.end('current money is ' + session[cardId].mny);
      } else {
        // 第一次
        let cardId = uuid.v4(); // 生成一个卡号
        res.setHeader('Set-Cookie', `${shopName}=${cardId}`);
        console.log('====================================');
        console.log(1);
        console.log('====================================');
        session[cardId] = { mny: 100 };
        res.end('weclome current money is ' + session[cardId].mny);
      }
    }
  })
  .listen(3003);
// 实现一个注册登录 jwt  koajs
