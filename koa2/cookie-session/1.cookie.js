/**
 * http header 默认 4k cookie 4k
 * 浏览器localstorage (跨域吗？大小限制 5M)
 * http无状态的 cookie 做登录 / jwt json web token
 * session 是服务器上的  cookie 服务器和客户端端都能设置
 * session 是基于cookie的 （如果什么都放到cookie上 可能占用流量 需要合理设置cookie）

 1. 摘要算法：摘要算法又称哈希/散列算法。它通过一个函数，把任意长度的数据转换为一个长度固定的数据串
 （通常用16进制的字符串表示）。算法不可逆
 */
let http = require('http');
let querystring = require('querystring');
let crypto = require('crypto');

http
  .createServer(function (req, res) {
    let sign = (value) => {
      return (
        crypto
          .createHmac('sha256', 'zf')
          .update(value.toString())
          // base64字符串在传输过程中，会把/+=变成'',
          .digest('base64')
          .replace(/\/|\+|\=/, '')
      );
    };
    res.getCookie = function getCookie(key, { signedCookie }) {
      let cookies = querystring.parse(req.headers.cookie, '; ');
      if (signedCookie) {
        // 如果内容签名了 我需要核实一下内容是否可靠
        let [value, signStr] = cookies[key].split('.');
        let s = sign([value]);
        if (s === signStr) {
          return value;
        } else {
          return '';
        }
      }
      return cookies[key] || '';
    };
    let cookiesArr = [];
    res.setCookie = function (key, value, options = {}) {
      let optionArgs = [];
      if (options.domain) {
        optionArgs.push(`domain=${options.domain}`);
      }
      if (options.path) {
        optionArgs.push(`path=${options.path}`);
      }
      if (options.httpOnly) {
        optionArgs.push(`httpOnly=true`);
      }
      if (options.signedCookie) {
        value = value + '.' + sign(value); // 10.xxx
      }
      cookiesArr.push(`${key}=${value}; ${optionArgs.join('; ')}`);
      res.setHeader('Set-Cookie', cookiesArr);
    };
    // cookie不能跨域设置，携带凭证
    // 读取cookie  如果超过最大存活时间会自动销毁
    if (req.url === '/read') {
      // name=zf; age=10  => {name:zf,age:10}
      console.log(req.headers.cookie);
      let age = res.getCookie('age', { signedCookie: true });
      res.end(age.toString());
      //res.end(JSON.stringify(querystring.parse(req.headers.cookie,'; ')));
    }
    // 设置cookie
    if (req.url === '/write') {
      //www.baidu.com music.baidu.com  => .baidu.com
      // domain 只能在某个域名下设置cookie
      // path 在哪个路径下可以访问cookie ，以 / 开头表示任何路径都可以, /xxx 以xxx开头即可
      // max-age(相对时间) expires(绝对时间) 设置缓存时间
      //   res.setHeader('Set-Cookie', [
      //     'name=zf; domain=.zf.cn; max-age=10',
      //     `age=10; max-age=10; httpOnly=true; expire=${new Date(
      //       Date.now() + 10 * 1000
      //     ).toGMTString()}`,
      //   ]);
      // httpOnly 是否服务端设置就，前端不能更改，保证cookie不能再浏览器端获取，但是依然可以伪造,篡改

      //   如果不设置 domain path 每次请求都会带上cookie，增加传输流量的浪费，合理设置，减少传输
      res.setCookie('name', 'jw.zxcvzxcx', {
        httpOnly: true,
        domain: '.baidu.com',
        path: '/',
        maxAge: 10,
      }); // md5
      res.setCookie('age', 10, { signedCookie: true });
      res.end('ok');
    }
    res.end('路径有误');
  })
  .listen(3000);
// 有一个秘钥 ，这个秘钥只有我有，如果用户改了cookie

// 加盐
//
// let r = crypto.createHmac('sha256','zf1').update('hello').digest('base64');
// console.log(r);
