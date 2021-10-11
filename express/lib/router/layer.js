/**
 * 存储路径 和 当前路由的dispatch方法
 * @param {*} path
 * @param {*} handler
 */
function Layer(path, handler) {
  this.path = path;
  this.handler = handler;
}

// 用来匹配路径
Layer.prototype.match = function (pathname) {
  // 中间件
  if (this.path === pathname) {
    return true;
  }
  if (this.route) {
    // /user/1/2    this.regexp
    let matches = pathname.match(this.regexp);
    if (matches) {
      let values = matches.slice(1);
      this.params = this.keys.reduce((memo, current, index) => {
        memo[current.name] = values[index];
        return memo;
      }, {});
      return true;
    }
  }
  if (!this.route) {
    if (this.path === '/') {
      // 中间件全都匹配
      return true;
    }
    // 如果中间件 以当前的请求路径开头 表示也可以匹配到
    return pathname.startsWith(this.path + '/');
  }
  return false;
};

module.exports = Layer;
