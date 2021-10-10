const http = require('http');
const Router = require('./router/index');
// 将应用和路由解耦，进行一个分离
function Application() {
  this._routers = new Router();
}
Application.prototype.get = function (path, handler) {
  this._routers.get(path, handler);
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
