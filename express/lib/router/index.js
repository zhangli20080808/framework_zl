const url = require('url');
function Router() {
  this.stack = [];
}
Router.prototype.get = function (path, handler) {
  this.stack.push({
    path,
    method: 'get',
    handler,
  });
};
Router.prototype.handler = function (req, res, done) {
  let { pathname } = url.parse(req.url);
  let m = req.method.toLowerCase();
  for (let i = 0; i < this.stack.length; i++) {
    const { path, method, handler } = this.stack[i];
    if (path === pathname && method === m) {
      return handler(req, res);
    }
  }
  done();
};

module.exports = Router;
