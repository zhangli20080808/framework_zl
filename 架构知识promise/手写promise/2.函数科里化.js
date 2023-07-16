// 函数科里化 - 比如 判断一个元素的类型、数组、对象
/*
 * 1.typeof 不能区分对象和数组
 * 2.constructor 可以判断这个实例是通过谁构造出来的 无法区分到底属于谁
 * 3.instanceof 可以区分实例
 * 4.Object.prototype.toString.call([]) 区分具体的类型 不能区分实例
 *
 * https://developer.aliyun.com/article/975037
 * */
// function isType (content, typing) {
//   return Object.prototype.toString.call(content) === `[object ${typing}]`
// }
//
// console.log(isType('123', 'String')) //true
// console.log(isType(123, 'Number')) //true

// 什么叫函数科里化呢? 就是细化函数的功能 ，把一个函数的范围变小,让其变得具体一点
// 柯里化是一门儿技术，它可以让我们接收多个参数的函数变为只接受一个参数的函数，比如将函数fn(a,b,c)变为fn(a)、fn(b)、fn(c)，
// 我们可以这样进行调用：fn(a)(b)(c)。并且可以返回正确的结果。

// 一个普通函数
function sum(a, b, c) {
  return a + b + c;
}
// 正常调用
sum(10, 20, 30);

// 将sum函数柯里化,返回一个新函数
let newFn = curry(sum);

// 新的调用方式
newFn(10)(20)(30);

// 提示
// newFn(10)返回一个函数
// newFn(20)返回一个函数
// newFn(30)返回最终结果

// 优缺点
// 1. 函数柯里化之后让函数变得更加单一，一次只接受一个参数，松散解耦。
// 2. 函数的通用性将变低，比如原来接收3个参数的函数，我们可以拿着3个参数处理更多操作，但是函数变为只接收一个参数后，我们的操作会受很多限制。

// 函数柯里化实际上是函数式编程中的一大重要思想：
// 一个函数只处理一件事，函数需要遵循只接收一个参数和只返回一个结果的规则。

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
  // console.log(len, 'len');
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
newSum(1, 2)(3)(4)(5); // 15

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

/**
* 将sum函数科里化，返回一个新的函数
let newFn = currying(sum)
// 新的调用方式
   newFn(10)(20)(30)
   newFn(10,10)(30)
// 分布理解
   newFn(10)返回的是一个函数，因为后续还要继续调用 
   newFn(10)(20)同样返回的是一个函数，因为后续还要继续调用 
   newFn(10)(20)(30) 返回最后结果
// curry函数的特点
  1. curry函数返回一个新的额函数
  2. 调用 newFn 的时候，如果函数参数累计小于原函数应该接受的参数个数时候，返回一个函数
  3. 当接收到函数参数大于或者等于原函数应该接受的参数时，执行原函数
// 实现思路
 * 拿到原函数的形参个数 el
 * 拿到目前接受的参数的 args
 * 比较 len 和 args 的大小
 * 根据大小判断 返回一个函数还是 返回原函数执行的结果
 * @param {*} fn 原函数
 * @param {*} ...args 可以传入初始参数
 */

// 函数的 arguments 参考 https://blog.csdn.net/weixin_42175823/article/details/116132377
// 主要用途 1. 用来判断有多少个参数传入函数
// argument.length  - 表示 实际传入参数的个数

function curry(fn, ...args) {
  // 返回一个函数
  return function () {
    // 缓存目前接受的参数个数
    let _args = [...args, ...arguments];
    // 原函数应该接受的参数个数
    let len = fn.length;
    // 比较目前参数累计和原函数应该接受的参数
    if (_args?.length < len) {
      // 代表需要返回一个新的函数
      return curry(fn, ..._args);
    } else {
      // 参数累计够了，返回原函数执行的结果
      return fn.apply(this, _args);
    }
  };
}

function sum2(a, b, c) {
  return a + b + c;
}
// 正常调用
// console.log(sum2(10, 20, 30)); // 60
// 科里化调用
let newFn2 = curry(sum2);
console.log('[ 1 ] >', newFn2(10)(20)(30));
console.log('[ 2 ] >', newFn2(10, 20)(30));
// 注意
// 需要缓存每一次缓存传入的参数。
// 利用闭包和递归，隔离每次的作用域。
// fn.length获取的是函数的形参个数。

// • 函数柯里化降低了函数通用性，却提高了适用性。
// • 函数柯里化主要应用场景：参数复用、延迟执行。
// • 函数柯里化的重点在于闭包和递归，将每次执行的作用域保存在内存中，等待后续使用。
