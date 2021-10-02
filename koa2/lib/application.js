const http = require('http');
const request = require('./request');
const response = require('./response');
const context = require('./context');
const EventEmitter = require('events');

// 多个人 通过同一个类 实例化不同的对象
module.exports = class Applicaton extends EventEmitter {
  constructor() {
    super();
    // 默认线上 request response context 进行拷贝
    this.request = Object.create(request);
    this.response = Object.create(response);
    this.context = Object.create(context); // this.context.__proto__ === context

    this.middlewares = []; // 存放所有的use方法
  }

  use(callback) {
    this.middlewares.push(callback);
  }
  createContext(req, res) {
    // 每次请求上下文，都应该是独立的
    let request = Object.create(this.request);
    let response = Object.create(this.response);
    let context = Object.create(this.context); // context.__proto__ = this.context.__proto__

    context.request = request;
    context.response = response;

    context.req = context.request.req = req;
    context.res = context.response.res = res;
    return context;
  }

  /**
   * 1. 默认执行第一个，然后继续执行
   * 2. 返回值进行包装 返回 Promise
   */
  compose(ctx) {
    // 默认将 middlewares 里的第一个执行
    let index = -1;
    const dispatch = (i) => {
      let middleware = this.middlewares[i];

      if (i === index) {
        return Promise.reject(new Error('next() cb 多次调用'));
      }
      index = i; // 相当于第一次调用时候 将 index 变为 0

      // 如果执行完毕会，返回的不是 promise 进行包装
      if (i === this.middlewares.length) {
        return Promise.resolve();
      }
      // 链式调用 之后 如果用户调用了 await next()
      // 这里需要增加 错误处理 负责直接抛出 需要捕获异常
      try {

        return Promise.resolve(middleware(ctx, () => dispatch(i + 1)));
      } catch (error) {
        return Promise.reject(error);
      }
    };
    return dispatch(0); // 默认取出第一个执行
  }

  handleRequest(req, res) {
    // 通过请求和响应 + 自己封装的 request和response 组成一个当前请求的上下文
    const ctx = this.createContext(req, res);

    // this.callback(ctx);
    // 组合多个函数
    this.compose(ctx)
      .then(() => {
        res.end(ctx.body); // 最终拿到用户设置的结果返回回去
      })
      .catch((err) => {
        this.emit('error', err);
      });
  }
  listen(...args) {
    // 通过bind绑定方法，也可以通过箭头函数，也可以直接调用，返回函数
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
};
