// 浅克隆
function shallow(obj) {
  const cloneObj = {};
  for (const key in obj) {
    cloneObj[key] = obj[key];
  }
  return cloneObj;
}
// 深克隆
// 1. 考虑基础类型
// 2. RegExp、Date、函数 不是 JSON 安全的
// 3. 会丢失 constructor，所有的构造函数都指向 Object
// 破解循环引用
function deepClone(obj, hash = new WeakMap()) {
  if (obj == null) return obj;
  if (typeof obj !== 'object') return obj;
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  const cloneObj = Array.isArray(obj) ? [] : {};
  hash.set(obj, cloneObj);
  // 设置配置表
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const element = object[key];
      cloneObj[key] = deepClone(element, hash);
    }
  }
  return cloneObj;
}

// new 发生了什么？
function newFn(fn, ...args) {
  const obj = Object.create(fn.prototype);
  fn.call(obj, ...args);
  return obj;
}
