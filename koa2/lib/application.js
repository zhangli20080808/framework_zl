const http = require('http');
const request = require('./request');
const reponse = require('./reponse');
const context = require('./context');

// 多个人 通过同一个类 实例化不同的对象
module.exports = class Applicaton {
  constructor() {
    // 默认线上 request response context 进行拷贝
    this.request = Object.create(request);
    this.reponse = Object.create(reponse);
    this.context = Object.create(context);
  }

  use(callback) {
    this.callback = callback;
  }
  createContext(req, res) {
    // 每次请求上下文，都应该是独立的
    let request = Object.create(this.request);
    let reponse = Object.create(this.reponse);
    let context = Object.create(this.context);

    context.request = request;
    // context.reponse = reponse

    context.req = context.request.req = req;

    return context;
  }
  handleRequest(req, res) {
    // 通过请求和响应 + 自己封装的 request和response 组成一个当前请求的上下文
    const ctx = this.createContext(req, res);

    this.callback(ctx);
  }
  listen(...args) {
    // 通过bind绑定方法，也可以通过箭头函数，也可以直接调用，返回函数
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
};
