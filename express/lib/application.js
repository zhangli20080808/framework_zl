const url = require('url');
const http = require('http');
function Application() {
  this.routers = [
    {
      path: '*',
      method: 'all',
      handler(req, res) {
        console.log(`Cannot find ${req.path} ${req.url} my`);
      },
    },
  ];
}
Application.prototype.get = function (path, handler) {
  this.routers.push({
    path,
    method: 'get',
    handler,
  });
};

Application.prototype.listen = function () {
  let server = http.createServer((req, res) => {
    let { pathname } = url.parse(req.url);
    console.log(pathname, 'pathname');
    let m = req.method.toLowerCase();
    // 从第二个开始，如果匹配不到，默认匹配第一个
    for (let i = 1; i < this.routers.length; i++) {
      const { path, method, handler } = this.routers[i];
      if (path === pathname && method === m) {
        return handler(req, res);
      }
      this.routers[0].handler(req, res);
    }
  });
  server.listen(...arguments);
};

module.exports = Application;
