const url = require('url');
let request = {
  get url() {
    // 这里的this指代的是 ctx.request 因为使用的时候是通过 ctx.request.url 来使用的
    // ctx.request.req = req
    return this.req.url;
  },
  get path() {
    return url.parse(this.req.url).pathname;
  },
  get query() {
    return url.parse(this.req.url).query;
  },
};

module.exports = request;

// 在ctx上面取 url 其实是经过代理了
// Object.defineProperty('ctx','url',{
//   get(){
//     return ctx.request.url
//   }
// })
