let obj = {
  name: { name: 1, age: 2, c: { c: 1 } },
};
function update() {
  console.log('更新');
}
let handler = {
  // 兼容性不好
  set(target, key, value) {
    // reflect
    update();
    return Reflect.set(target, key, value); // proxy reflect 都是es6
  },
  get(target, key) {
    if (typeof target[key] === 'object') {
      return new Proxy(target[key], handler);
    }
    return Reflect.get(target, key);
  },
};
let proxy = new Proxy(obj, handler);
// proxy.name  = name对象的代理
// name对象取c  c对的代理
proxy.name.c.c = 100;

// proxy + object.defineProperty

// 数组检测
// 数组的常见方法
// class
// 模板字符串
// 箭头函数
// ...
