/**
 * 1. 创建应用
   2. 用户调用方法，比如get post 将这些方法都维护在路由系统中
   3. Router中的stack存放在一个个层 Layer, 每个Layer有 path和dispatch,每个layer都有一个route属性，通过new Route
   4. Route中有stack，存放一个个layer
   5. 请求到来，找到对应的dispatch方法
 */
const http = require('http');
const Router = require('./router/index');
// 将应用和路由解耦，进行一个分离
function Application() {
  this._routers = new Router();
}
Application.prototype.get = function (path, ...handlers) {
  this._routers.get(path, handlers);
};

Application.prototype.listen = function () {
  let server = http.createServer((req, res) => {
    // 需要让路由自己去匹配，如果匹配不到再找应用系统
    function done() {
      res.end(`Cannot find ${req.method} ${req.url}`);
    }
    this._routers.handler(req, res, done);
  });
  server.listen(...arguments);
};

module.exports = Application;
