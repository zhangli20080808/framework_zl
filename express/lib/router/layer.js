/**
 * 存储路径 和 当前路由的dispatch方法
 * @param {*} path 
 * @param {*} handler 
 */
function Layer(path, handler) {
  this.path = path;
  this.handler = handler;
}

module.exports = Layer;
