// 1. 作用域 函数作用域，全局作用域
// 2. 作用域链
// 闭包产生的本质？ - 当前环境中存在指向父级作用域的引用

// 闭包是什么？ 简单理解 - 闭包是指有权访问另外一个函数作用域中的变量的函数

// js代码的执行分两个阶段：编译阶段 + 执行阶段
// 1. 编译阶段 - 由编译器完成，这个阶段作用域规则会确定
// 2. 执行阶段 - 由引擎完成，主要任务是执行可执行代码，执行上下文在这个阶段创建。

function getUrlParams(url, key) {
  // 创建一个 URLSearchParams 对象
  const urlParams = new URLSearchParams(new URL(url).search);

  // 获取指定键的参数值
  return urlParams.get(key);
}

// 测试用例
const url1 = 'https://example.com/?name=John&age=30';
console.log(getUrlParams(url1, 'name')); // 输出: John
console.log(getUrlParams(url1, 'age')); // 输出: 30
console.log(getUrlParams(url1, 'city')); // 输出: null

const url2 = 'https://example.com/search?query=React+JS&sort=desc';
console.log(getUrlParams(url2, 'query')); // 输出: React JS
console.log(getUrlParams(url2, 'sort')); // 输出: desc
console.log(getUrlParams(url2, 'limit')); // 输出: null
// 代码分享
function foo() {
  return (a) => {
    console.log(this.a);
  };
}

var obj1 = {
  a: 2,
};

var obj2 = {
  a: 3,
};

var bar = foo.call(obj1); // 因此，箭头函数 (a) => { console.log(this.a); } 的 this 也指向 obj1
bar.call(obj2);
// 1、bar 是 foo 函数 返回的 箭头函数
// 2. 尽管 bar.call(obj2) 尝试将 obj2 作为 this 上下文传递，
// 但由于箭头函数的 this 已经在定义时绑定到了 obj1，所以 this 仍然指向 obj1。

// 箭头函数的 this 绑定是在定义时确定的，而不是在调用时确定的！！！

function sum(a, b) {
  return a + b;
}
function curry(fn, ...args) {
  // 返回一个函数
  let _args = [];
  function calc(...args2) {
    // 缓存目前接受的参数个数
    // 原函数应该接受的参数个数
    let len = fn.length;
    _args = [...args, ...args2];
    // 比较目前参数累计和原函数应该接受的参数
    if (_args?.length < len) {
      // 代表需要返回一个新的函数
      return calc;
    } else {
      // 参数累计够了，返回原函数执行的结果
      return fn.apply(this, _args.slice(0, len));
    }
  }
  return calc;
}

let newFn2 = curry(sum);
console.log(newFn2(1, 2)(3)(4)(5)); // 15
