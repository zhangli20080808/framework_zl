// 实现一个登陆功能
// 实现一个校验是否登陆

let Koa = require('koa');
let Router = require('koa-router');
let bodyparser = require('koa-bodyparser');
let jwt = require('jwt-simple');

let app = new Koa();
let router = new Router();
app.use(bodyparser());

let crypto = require('crypto');
let MyJwt = {
  // base 去掉 + / =
  escape(content) {
    return content.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');
  },
  fromStringToBase64(content) {
    return this.escape(Buffer.from(JSON.stringify(content)).toString('base64'));
  },
  unescape(str) {
    str += new Array(5 - (str.length % 4)).join('=');
    return str.replace(/\-/g, '+').replace(/_/g, '/');
  },
  sign(content, secret) {
    return this.escape(
      crypto.createHmac('sha256', secret).update(content).digest('base64')
    );
  },
  encode(content, secret) {
    // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMSIsImV4cHIiOiJTdW4s
    // IDEwIE9jdCAyMDIxIDA3OjQwOjAwIEdNVCJ9.SDU75rh71RNUB75VJ_BGU5y0ab3Qt4EAlap4C_e9QGI"
    // header +'.'+payload  = sha256加密出来一个sign
    // header + '.' + payload + '.' + sign
    // 将header转成base64
    let header = this.fromStringToBase64({ typ: 'JWT', alg: 'HS256' }); // 固定死的，这两个参数
    // 将payload转成base64 payload还是明文，还是可以解码出来的，不能存储铭感信息
    let body = this.fromStringToBase64(content);
    // 将header和payload组合到一起，一起签名
    let sign = this.sign(header + '.' + body, secret);
    // 散步分放在一起就是最终的结果
    return header + '.' + body + '.' + sign;
  },
  fromBase64ToString(content) {
    return Buffer.from(content, 'base64').toString();
  },
  decode(content, secret) {
    let [header, body, sign] = content.split('.');
    let newSign = this.sign(header + '.' + body, secret);
    if (newSign === sign) {
      let content = this.fromBase64ToString(this.unescape(body));
      content = JSON.parse(content);
      console.log(new Date(content.expr), Date.now());
      if (content.expr && new Date(content.expr) < Date.now()) {
        throw new Error('过期了');
      }
      return content;
    } else {
      throw new Error('token错误');
    }
  },
};

// jwtwebtoken  jwt-simple
let secret = 'zf';
router.post('/login', async (ctx) => {
  // 当访问登陆的时候
  let { username, password } = ctx.request.body;
  console.log(username, password);
  if (username === password) {
    // 登陆过了 需要给他发一个token
    // 加入一个过期的字段 如果超过这个事件当前token就过期了
    let content = {
      user: username,
      expr: new Date(Date.now() + 20 * 1000).toGMTString(),
    };
    console.log(content);

    // decode校验签名正确性包括解析内容 encode签名
    let token = jwt.encode(content, secret);
    ctx.body = {
      code: 200,
      content,
      token,
    };
  } else {
    // ctx.status = 401; // 需要前端配合
    ctx.body = {
      code: 401,
      data: '登陆失败',
    };
  }
});
router.get('/validate', async (ctx) => {
  // 校验内容是否合法
  let [, token] = ctx.get('authorization').split(' ');
  console.log('====================================');
  console.log(token);
  console.log('====================================');
  if (token) {
    try {
      let content = MyJwt.decode(token, secret); // 把默认的内容取出来
      // 续命 继续验证增加登陆的时长
      content = {
        ...content,
        expr: new Date(Date.now() + 10 * 10000).toGMTString(),
      };
      token = MyJwt.encode(content, secret);
      ctx.body = {
        code: 200,
        content,
        token,
      };
    } catch (e) {
      console.log(e);
      ctx.body = {
        code: 401,
        data: '没有登陆',
      };
    }
  } else {
    ctx.body = {
      code: 401,
      data: '没有登陆',
    };
  }
});

app.use(router.routes());

app.listen(3003);