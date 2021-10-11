const url = require('url');
const Route = require('./route');
const Layer = require('./layer');
const methods = require('methods');
function Router() {
  this.stack = [];
}
Router.prototype.route = function (path) {
  let route = new Route();
  // 每个路由上都有一个 layer 都有一个路径 和 一个处理函数 dispatch 方法，route的
  let layer = new Layer(path, route.dispatch.bind(route));
  // layer和route产生关联
  layer.route = route;
  this.stack.push(layer); // 将当前生成的路由层，放入路由系统中
  return route;
};

methods.forEach((method) => {
  Router.prototype[method] = function (path, handlers) {
    // 1. 当我们调用 get 方法的时候，需要创建一个 layer，将 layer 放入我们的 stack 中
    // 2. 路由系统中的 layer 上应该有一个route属性
    let route = this.route(path);
    // 需要将 用户的handler，可能有多个 传入当前路由对应的route的内部，也就是将用户传过来的方法，放入 route中
    // 产生一个个layer
    route[method](handlers);
    // this.stack.push({
    //   path,
    //   method: 'get',
    //   handler,
    // });
  };
});

/**
 * 先将stack中的第一个拿出来
 */
Router.prototype.handler = function (req, res, out) {
  let { pathname } = url.parse(req.url);
  // let m = req.method.toLowerCase();
  // for (let i = 0; i < this.stack.length; i++) {
  //   const { path, method, handler } = this.stack[i];
  //   if (path === pathname && method === m) {
  //     return handler(req, res);
  //   }
  // }
  // done();
  // 需要依次取出来每一个来执行
  let idx = 0;
  let next = () => {
    if (idx >= this.stack.length) return out();
    let layer = this.stack[idx++];
    if (layer.match(pathname) && layer.route.handle_method(req.method)) {
      // 如果路径一样，就处理对应的回调函数
      layer.handler(req, res, next);
    } else {
      next();
    }
  };
  next();
};

module.exports = Router;
