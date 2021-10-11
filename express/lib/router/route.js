/**
 * 路由的layer上route (这个layer上是有路径的) route里面存放的是用户传入的回调
   通过回调产生一个个 layer(这个layer是没有路径的，但是会区分方法)
 */
const Layer = require('./layer');
function Route() {
  this.stack = [];
}

Route.prototype.get = function (handlers) {
  handlers.forEach((handler) => {
    let layer = new Layer('/', handler);
    layer.method = 'get';
    this.stack.push(layer);
  });
};

/**
 * 路径匹配到之后，会调用dispatch ，会找route里面的layer 让其执行
 */
Route.prototype.dispatch = function (req, res, out) {
  let idx = 0;
  let next = () => {
    if (idx >= this.stack.length) return out();
    let layer = this.stack[idx++];
    if (layer.method === req.method.toLowerCase()) {
      layer.handler(req, res, next);
    } else {
      next();
    }
  };
  next();
};
module.exports = Route;
