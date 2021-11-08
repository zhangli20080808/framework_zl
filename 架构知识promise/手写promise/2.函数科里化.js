// 函数科里化 - 比如 判断一个元素的类型、数组、对象
/*
 * 1.typeof 不能区分对象和数组
 * 2.constructor 可以判断这个实例是通过谁构造出来的 无法区分到底属于谁
 * 3.instanceof 可以区分实例
 * 4.Object.prototype.toString.call([]) 区分具体的类型 不能区分实例
 * 
 * 
 * */
// function isType (content, typing) {
//   return Object.prototype.toString.call(content) === `[object ${typing}]`
// }
//
// console.log(isType('123', 'String')) //true
// console.log(isType(123, 'Number')) //true

// 什么叫函数科里化呢? 就是细化函数的功能 ，把一个函数的范围变小,让其变得具体一点
// 内置参数 isNumber  isString
// function isType(typing) {
//   私有化，这个函数可以拿到上层函数的参数，这个空间不会被释放掉，这个闭包并没有在当前作用域被执行，
//   而是在外层被调用，那这个函数的外层作用域是不会被销毁的
//   return (content) => {  //
//     return Object.prototype.toString.call(content) === `[object ${typing}]`;
//   };
// }
// const isString = isType('String');
// let flag = isString('aaa');
// console.log(flag);

// const isType = (typing) => value => {
//   return Object.prototype.toString.call(value) === `[object ${typing}]`
//
// }
// let util = {};
// ['String', 'Number', 'Null', 'Undefined'].forEach(typing => {
//   util['is' + typing] = isType(typing)
// })
// console.log(util.isString(123)) //false
// console.log(util.isString('123')) //true

//通用的函数科里化如何实现？ 希望可以分开传递参数
function sum(a, b, c, d, e) {
  console.log(a + b + c + d + e);
}
/**
 * 希望 sum(1)(2,3)(4)(5)
 * 创建的时候也可以先保留两个参数，返回一个被科里化后的结果  curring(sum(1,2)) | curring(sum)(1)(2) 之后传参  curring(sum(1,2))(3)(4)
 * 通过 curring(sum(1,2))
 */

const curring = (fn, arr = []) => {
  // arr 第一次传的是默认值
  // 记录调用时参数的个数 和函数个体的关系  长度指代的是函数的参数个数
  let len = fn.length;
  console.log(len, 'len');
  // 科里化完传几个参数是不确定的，当数量=函数参数个数的时候，再让sum当前函数执行
  return (...args) => { 
    //保存用户传入的参数
    let concatArgs = [...arr, ...args];
    console.log(concatArgs, 'concatArgs');
    // 获取长度和值得关系 通过传递的参数 不停的判断是否达到函数执行的参数个数
    // 如果参数个数不满足调用函数的参数个数，再返回一个函数，等待参数传入
    if (concatArgs.length < len) {
      //递归
      // console.log(args,'hello')
      return curring(fn, concatArgs);
    } else {
      // console.log(args)
      return fn(...concatArgs); // 如果达到了执行个数之后 会让函数执行
    }
  };
};

let newSum = curring(sum);
newSum(1, 2)(3)(4)(5);  // 15

// 应用场景
const isType = (type, content) => {
  // console.log(type, content);
  return Object.prototype.toString.call(content) === `[object ${type}]`;
};
let util = {};
['String', 'Number', 'Null', 'Undefined', 'Boolean'].forEach((item) => {
  // 相当于将函数 先调用一次
  util['is' + item] = curring(isType)(item);
});
console.log(util.isString('hello'));
console.log(util.isNumber(1));

//科里化  依次传入   反科里化  也有可能叫偏函数  第一个函数参数可能有n个
// function fn (a, b, c) {
//   return a + b + c
// }

// 希望 console.log((1)(2,3)(4))
//
// function fn (a) {
//   return function (b) {
//     return function (c) {
//       return a + b + c
//     }
//   }
// }
