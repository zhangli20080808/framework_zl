/**
 * 1. 创建应用
   2. 用户调用方法，比如get post 将这些方法都维护在路由系统中
   3. Router中的stack存放在一个个层 Layer, 每个Layer有 path和dispatch,每个layer都有一个route属性，通过new Route
   4. Route中有stack，存放一个个layer
   5. 请求到来，找到对应的dispatch方法
 */
const http = require('http');
const methods = require('methods');
const Router = require('./router/index');

// 将应用和路由解耦，进行一个分离
function Application() {
  // 希望 当创建应用时，不是立即初始化路由系统
  // this._routers = new Router();
}
Application.prototype.lazy_route = function () {
  if (!this._routers) {
    this._routers = new Router();
  }
};

methods.forEach((method) => {
  Application.prototype[method] = function (path, ...handlers) {
    this.lazy_route();
    this._routers[method](path, handlers);
  };
});

Application.prototype.listen = function () {
  let server = http.createServer((req, res) => {
    this.lazy_route();
    // 需要让路由自己去匹配，如果匹配不到再找应用系统
    function done() {
      res.end(`Cannot find ${req.method} ${req.url}`);
    }
    this._routers.handler(req, res, done);
  });
  server.listen(...arguments);
};

module.exports = Application;
