// console.log([] instanceof Array)
// console.log([] instanceof Object)
//
// console.log([].__proto__ === Array.prototype)
// console.log([].__proto__.__proto__ === Object.prototype)

class A {}

let a = new A();
// 不能判断自定义类型
console.log(Object.prototype.toString.call(a));

function instanceOf(C, D) {
  D = D.prototype;
  C = C.__proto__;

  while (true) {
    if (C === null) {
      return false;
    }
    if (C === D) {
      return true;
    }
    C = C.__proto__;
  }
}

function inss(A, B) {
  if (A == null) return false;
  const type = typeof A;
  if (type !== 'object' && type !== 'function') {
    return false;
  }
  let instance = A;
  while (instance) {
    if (instance.__proto__ === B.prototype) {
      return true;
    }
    instance = instance.__proto__;
  }
  return false;
}

console.log(instanceOf(a, Array));
// 缺陷 如果是原始类型就不能检验了
let str = '123';
console.log(str instanceof String);
// 等价写法
console.log(String[Symbol.hasInstance](str));

class ValidateStr {
  //重写这方方法
  static [Symbol.hasInstance](x) {
    return typeof x === 'string';
  }
}

console.log(ValidateStr[Symbol.hasInstance]('hello'));
console.log('hello' instanceof ValidateStr);
